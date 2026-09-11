import { v } from "convex/values";
import { internalQuery } from "./_generated/server";
import { employeeValidator } from "./validators";

export const search = internalQuery({
  args: { query: v.string() },
  returns: v.array(employeeValidator),
  handler: async (ctx, args) => {
    const needle = args.query.trim().toLowerCase();
    if (needle.length < 2) {
      return [];
    }

    const employees = await ctx.db.query("employees").take(50);
    return employees
      .filter((employee) => {
        return (
          employee.name.toLowerCase().includes(needle) ||
          employee.role.toLowerCase().includes(needle) ||
          employee.department.toLowerCase().includes(needle) ||
          employee.email.toLowerCase().includes(needle)
        );
      })
      .slice(0, 5)
      .map((employee) => ({
        name: employee.name,
        role: employee.role,
        department: employee.department,
        email: employee.email,
        location: employee.location,
      }));
  },
});
