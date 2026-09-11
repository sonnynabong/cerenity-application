"use node";

import { v } from "convex/values";
import { internalAction } from "./_generated/server";
import { internal } from "./_generated/api";
import { POLICY_DOCS } from "./policyDocs";
import { requireAnyProviderKey } from "./providerKeys";
import { POLICY_NAMESPACE, getRag } from "./rag";

export const run = internalAction({
  args: {},
  returns: v.object({
    products: v.number(),
    employees: v.number(),
    documents: v.array(
      v.object({
        title: v.string(),
        status: v.string(),
      }),
    ),
  }),
  handler: async (
    ctx,
  ): Promise<{
    products: number;
    employees: number;
    documents: Array<{ title: string; status: string }>;
  }> => {
    const counts: { products: number; employees: number } =
      await ctx.runMutation(internal.seedMutations.seedStructured, {});

    requireAnyProviderKey();
    const rag = getRag();
    const documents: Array<{ title: string; status: string }> = [];

    for (const doc of POLICY_DOCS) {
      const { status } = await rag.add(ctx, {
        namespace: POLICY_NAMESPACE,
        key: doc.key,
        title: doc.title,
        text: doc.text,
      });
      documents.push({ title: doc.title, status });
    }

    return { ...counts, documents };
  },
});
