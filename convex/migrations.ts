import { Migrations } from "@convex-dev/migrations";
import { components } from "./_generated/api";
import schema from "./schema";

export const migrations = new Migrations(components.migrations, { schema });

/**
 * Placeholder backfill hook for CI/CD.
 * Real schema rewrites should land as new `migrations.define` exports here,
 * not as SQL ALTER statements against Convex.
 */
export const noopProducts = migrations.define({
  table: "products",
  migrateOne: async () => {
    // no-op
  },
});

export const run = migrations.runner();
