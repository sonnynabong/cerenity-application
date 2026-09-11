"use node";

import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { v } from "convex/values";
import { action } from "./_generated/server";
import { api, internal } from "./_generated/api";
import type { Id } from "./_generated/dataModel";
import { POLICY_NAMESPACE, rag } from "./rag";
import { citationValidator } from "./validators";
import type { Citation } from "../lib/catalog";

const SYSTEM_PROMPT = `You are the Cerenity internal assistant.

Answer only from STRUCTURED FACTS and DOCUMENT EXCERPTS provided in the user message.
Prefer STRUCTURED FACTS for prices, stock, SKUs, owners, and people (role, email, location).
Prefer DOCUMENT EXCERPTS for policies (remote work, PTO, expenses, returns).
If the retrieved context is not enough, say you do not know. Never invent SKUs, prices, or policy details.
When you use a fact, mention the source title naturally.`;

function formatUsd(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

export const send = action({
  args: {
    threadId: v.optional(v.id("threads")),
    prompt: v.string(),
  },
  returns: v.object({
    threadId: v.id("threads"),
    content: v.string(),
    citations: v.array(citationValidator),
  }),
  handler: async (
    ctx,
    args,
  ): Promise<{
    threadId: Id<"threads">;
    content: string;
    citations: Citation[];
  }> => {
    const prompt = args.prompt.trim();
    if (!prompt) {
      throw new Error("Prompt cannot be empty");
    }
    if (!process.env.OPENAI_API_KEY) {
      throw new Error(
        "OPENAI_API_KEY is not set on the Convex deployment. Run `npx convex env set OPENAI_API_KEY` then `npx convex run seed:run`.",
      );
    }

    const threadId: Id<"threads"> =
      args.threadId ?? (await ctx.runMutation(api.threads.create, {}));

    await ctx.runMutation(internal.messages.insert, {
      threadId,
      role: "user",
      content: prompt,
      citations: [],
    });

    const listed = await ctx.runQuery(api.messages.listByThread, { threadId });
    const history = listed.slice(-10);

    const [products, employees] = await Promise.all([
      ctx.runQuery(internal.products.search, { query: prompt }),
      ctx.runQuery(internal.employees.search, { query: prompt }),
    ]);

    const citations: Citation[] = [];
    const structuredLines: string[] = [];

    for (const product of products) {
      const snippet = `${product.sku} ${product.name}: ${formatUsd(product.priceCents)}, stock ${product.stock}, owner ${product.owner}, category ${product.category}`;
      structuredLines.push(snippet);
      citations.push({
        kind: "structured",
        title: `${product.sku} ${product.name}`,
        snippet,
      });
    }

    for (const employee of employees) {
      const snippet = `${employee.name}, ${employee.role} (${employee.department}), ${employee.email}, ${employee.location}`;
      structuredLines.push(snippet);
      citations.push({
        kind: "structured",
        title: employee.name,
        snippet,
      });
    }

    let documentText = "";
    try {
      const retrieved = await rag.search(ctx, {
        namespace: POLICY_NAMESPACE,
        query: prompt,
        limit: 4,
        vectorScoreThreshold: 0.3,
        chunkContext: { before: 0, after: 1 },
      });
      documentText = retrieved.text;
      for (const entry of retrieved.entries) {
        const title = entry.title ?? "Policy";
        const snippet = entry.text.slice(0, 240);
        if (!citations.some((citation) => citation.title === title && citation.kind === "document")) {
          citations.push({
            kind: "document",
            title,
            snippet,
          });
        }
      }
    } catch (error) {
      console.error("Vector search failed", error);
      documentText = "";
    }

    const historyText = history
      .map((message) => `${message.role}: ${message.content}`)
      .join("\n");

    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      system: SYSTEM_PROMPT,
      prompt: `STRUCTURED FACTS:
${structuredLines.length > 0 ? structuredLines.join("\n") : "(none)"}

DOCUMENT EXCERPTS:
${documentText || "(none)"}

MESSAGE HISTORY:
${historyText || "(none)"}

QUESTION:
${prompt}`,
    });

    const finalCitations = citations.slice(0, 6);

    await ctx.runMutation(internal.messages.insert, {
      threadId,
      role: "assistant",
      content: text,
      citations: finalCitations,
    });

    return {
      threadId,
      content: text,
      citations: finalCitations,
    };
  },
});
