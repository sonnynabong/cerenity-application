import { v } from "convex/values";
import { internalMutation } from "./_generated/server";
import { SEED_EMPLOYEES, SEED_PRODUCTS } from "../lib/catalog";

export const seedStructured = internalMutation({
  args: {},
  returns: v.object({
    products: v.number(),
    employees: v.number(),
  }),
  handler: async (ctx) => {
    let products = 0;
    for (const product of SEED_PRODUCTS) {
      const existing = await ctx.db
        .query("products")
        .withIndex("by_sku", (q) => q.eq("sku", product.sku))
        .unique();
      if (existing) {
        await ctx.db.patch(existing._id, product);
      } else {
        await ctx.db.insert("products", product);
      }
      products += 1;
    }

    let employees = 0;
    for (const employee of SEED_EMPLOYEES) {
      const existing = await ctx.db
        .query("employees")
        .withIndex("by_name", (q) => q.eq("name", employee.name))
        .unique();
      if (existing) {
        await ctx.db.patch(existing._id, employee);
      } else {
        await ctx.db.insert("employees", employee);
      }
      employees += 1;
    }

    return { products, employees };
  },
});
