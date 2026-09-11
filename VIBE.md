# Vibe coding notes

This take-home was built in Cursor with a Grok agent, Convex MCP (plugin fallback when `convex_cerenity` timed out), and a written plan. The chatbot is the artifact; this file is the process.

## What the model suggested that we kept

- Next.js + Convex + Vercel AI SDK + OpenAI, not the article’s Django + LangChain + LanceDB sample.
- Hybrid retrieval always on (no LLM router): structured lookup and vector search run in parallel every turn.
- `@convex-dev/rag.search` plus our own prompt, not `rag.generateText`, so retrieve → augment → generate is visible in [`convex/chatActions.ts`](convex/chatActions.ts).
- Citations in the UI so RAG is inspectable without the dashboard.

## What the model got wrong (and we changed)

- Convex does not execute SQL. A first draft treated “SQL migrations for CI/CD” as something Convex would run. Runtime schema is [`convex/schema.ts`](convex/schema.ts); [`db/migrations/`](db/migrations/) is the portable Postgres contract; GitHub Actions deploys Convex with `npx convex deploy`.
- `npx convex dev` fails with a `preview:` deploy key. Dev uses the logged-in CLI (`--env-file .env.example`). Preview keys are for `convex deploy` in CI/preview, not local `dev`.
- Putting `"use node"` on a helper-only [`convex/rag.ts`](convex/rag.ts) is unnecessary; only the action files need Node.
- Reading `threadId` from `localStorage` in `useEffect` tripped `react-hooks/set-state-in-effect`. The UI uses `useSyncExternalStore` instead.

## MCP

[`AGENTS.md`](AGENTS.md) says prefer server `convex_cerenity` targeting `blissful-sheep-547`. In this session that namespace was missing and `plugin-convex-convex` `status` timed out, so verification used `npx convex data` / `npx convex run` against the same deployment. Production `majestic-gazelle-859` was not touched. Deploy keys stayed in `.env.local`.

## Eval set

| # | Question | Expected source |
| --- | --- | --- |
| 1 | What is the price of SKU CER-104? | Structured (`products`, Pulse Band $129.00) |
| 2 | How many Quiet Buds are in stock? | Structured (`CER-111`, stock 9) |
| 3 | Who is Maya Chen? | Structured (`employees`) |
| 4 | Who owns PTO balances? | Document (PTO policy → Alex Rivera) |
| 5 | What is the remote work policy? | Document (`remote-work.md`) |
| 6 | Can opened Sleep Tea be returned? | Document (returns policy, no) |
| 7 | Can a remote hire expense a Pulse Band? | Mixed (remote equipment + expense exclusion of CER-104) |
| 8 | Who won the 2014 World Cup? | Neither — assistant should say it does not know |

Reload the page after a turn: `localStorage` keeps `cerenity-thread-id` and `useQuery` restores the transcript.

## Verification in this session

- `npx convex data` on `blissful-sheep-547`: `employees`, `messages`, `products`, `threads` exist.
- Catalog seed: 12 products (including CER-104 Pulse Band at 12900 cents) and 8 employees.
- Chat UI at http://localhost:3000 loads sample prompts and persists the user turn.
- Policy embeddings and LLM answers were **not** completed here: `OPENAI_API_KEY` is unset on the deployment. After you set it, re-run `npx convex run seed:run` and walk the eval table above.
