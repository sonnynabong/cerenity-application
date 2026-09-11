# Portable database contract

Convex is the runtime database. It applies [convex/schema.ts](../convex/schema.ts) when you run `npx convex dev` (local/dev) or `npx convex deploy` (GitHub Actions / production). **Convex does not execute these `.sql` files.**

Keep this folder in lockstep with the Convex schema so a future Postgres (or pgvector) swap is a data-access change, not a redesign.

| File | Purpose |
| --- | --- |
| `001_init.sql` | Structured tables: `employees`, `products`, `threads`, `messages` |
| `002_vector_store.sql` | Future unstructured store (`document_chunks` + pgvector). Today that corpus lives in `@convex-dev/rag`. |
| `003_seed.sql` | Same catalog rows as `lib/catalog.ts` |

## CI/CD

GitHub Actions deploys Convex with `npx convex deploy` and `CONVEX_DEPLOY_KEY`. Do not add a SQL migrate step until a Postgres database exists.

## Convex data backfills

Schema-shape changes that need document rewrites use `@convex-dev/migrations` in [convex/migrations.ts](../convex/migrations.ts), not `ALTER TABLE`.
