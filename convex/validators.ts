import { v } from "convex/values";

export const citationValidator = v.object({
  kind: v.union(v.literal("structured"), v.literal("document")),
  title: v.string(),
  snippet: v.string(),
});

export const messageValidator = v.object({
  _id: v.id("messages"),
  threadId: v.id("threads"),
  role: v.union(v.literal("user"), v.literal("assistant")),
  content: v.string(),
  citations: v.array(citationValidator),
  createdAt: v.number(),
});

export const productValidator = v.object({
  sku: v.string(),
  name: v.string(),
  category: v.string(),
  priceCents: v.number(),
  stock: v.number(),
  owner: v.string(),
});

export const employeeValidator = v.object({
  name: v.string(),
  role: v.string(),
  department: v.string(),
  email: v.string(),
  location: v.string(),
});
