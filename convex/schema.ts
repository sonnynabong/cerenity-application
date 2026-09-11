import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const citationValidator = v.object({
  kind: v.union(v.literal("structured"), v.literal("document")),
  title: v.string(),
  snippet: v.string(),
});

export default defineSchema({
  threads: defineTable({
    createdAt: v.number(),
  }),

  messages: defineTable({
    threadId: v.id("threads"),
    role: v.union(v.literal("user"), v.literal("assistant")),
    content: v.string(),
    citations: v.array(citationValidator),
    createdAt: v.number(),
  }).index("by_thread", ["threadId"]),

  products: defineTable({
    sku: v.string(),
    name: v.string(),
    category: v.string(),
    priceCents: v.number(),
    stock: v.number(),
    owner: v.string(),
  })
    .index("by_sku", ["sku"])
    .index("by_name", ["name"]),

  employees: defineTable({
    name: v.string(),
    role: v.string(),
    department: v.string(),
    email: v.string(),
    location: v.string(),
  }).index("by_name", ["name"]),
});
