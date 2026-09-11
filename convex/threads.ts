import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const create = mutation({
  args: {},
  returns: v.id("threads"),
  handler: async (ctx) => {
    return await ctx.db.insert("threads", { createdAt: Date.now() });
  },
});
