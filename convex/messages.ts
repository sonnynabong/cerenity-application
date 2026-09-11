import { v } from "convex/values";
import { internalMutation, query } from "./_generated/server";
import { messageValidator } from "./validators";

export const listByThread = query({
  args: { threadId: v.id("threads") },
  returns: v.array(messageValidator),
  handler: async (ctx, args) => {
    const rows = await ctx.db
      .query("messages")
      .withIndex("by_thread", (q) => q.eq("threadId", args.threadId))
      .order("asc")
      .take(100);

    return rows.map((row) => ({
      _id: row._id,
      threadId: row.threadId,
      role: row.role,
      content: row.content,
      citations: row.citations,
      createdAt: row.createdAt,
    }));
  },
});

export const insert = internalMutation({
  args: {
    threadId: v.id("threads"),
    role: v.union(v.literal("user"), v.literal("assistant")),
    content: v.string(),
    citations: v.array(
      v.object({
        kind: v.union(v.literal("structured"), v.literal("document")),
        title: v.string(),
        snippet: v.string(),
      }),
    ),
  },
  returns: v.id("messages"),
  handler: async (ctx, args) => {
    const thread = await ctx.db.get(args.threadId);
    if (!thread) {
      throw new Error("Thread not found");
    }
    return await ctx.db.insert("messages", {
      threadId: args.threadId,
      role: args.role,
      content: args.content,
      citations: args.citations,
      createdAt: Date.now(),
    });
  },
});
