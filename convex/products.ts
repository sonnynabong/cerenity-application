import { v } from "convex/values";
import { internalQuery } from "./_generated/server";
import { productValidator } from "./validators";

export const search = internalQuery({
  args: { query: v.string() },
  returns: v.array(productValidator),
  handler: async (ctx, args) => {
    const skuMatch = args.query.toUpperCase().match(/CER-\d+/);
    if (skuMatch?.[0]) {
      const product = await ctx.db
        .query("products")
        .withIndex("by_sku", (q) => q.eq("sku", skuMatch[0]))
        .unique();
      return product
        ? [
            {
              sku: product.sku,
              name: product.name,
              category: product.category,
              priceCents: product.priceCents,
              stock: product.stock,
              owner: product.owner,
            },
          ]
        : [];
    }

    const needle = args.query.trim().toLowerCase();
    if (needle.length < 2) {
      return [];
    }

    const products = await ctx.db.query("products").take(50);
    return products
      .filter((product) => {
        return (
          product.name.toLowerCase().includes(needle) ||
          product.sku.toLowerCase().includes(needle) ||
          product.owner.toLowerCase().includes(needle) ||
          product.category.toLowerCase().includes(needle)
        );
      })
      .slice(0, 5)
      .map((product) => ({
        sku: product.sku,
        name: product.name,
        category: product.category,
        priceCents: product.priceCents,
        stock: product.stock,
        owner: product.owner,
      }));
  },
});
