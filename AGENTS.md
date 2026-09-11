# AGENTS.md

This repo is linked to the Convex project **cerenity-ai** on team **sonny-nabong**.

## Convex MCP

Project MCP server name: **`convex_cerenity`** in [`.cursor/mcp.json`](.cursor/mcp.json). Cursor does not use an `agents.mcp` file; agents discover this from `.cursor/mcp.json` and `AGENTS.md`.

- Use MCP server `convex_cerenity` for this app’s Convex backend. If that namespace is missing, fall back to the Convex plugin (`plugin-convex-convex`).
- Target deployment: `blissful-sheep-547`
- Cloud URL: `https://blissful-sheep-547.convex.cloud`
- Dashboard: https://dashboard.convex.dev/t/sonny-nabong/cerenity-ai/blissful-sheep-547
- Production deployment (separate): `majestic-gazelle-859` at `https://majestic-gazelle-859.convex.cloud` — treat as read-only unless production MCP flags are explicitly enabled

Auth for MCP is `CONVEX_DEPLOY_KEY` in gitignored [`.env.local`](.env.local). Never commit that file or paste the key into tracked config. [`.cursor/mcp.json`](.cursor/mcp.json) points at this workspace and `--env-file .env.local`; it must not contain the key.

When using Convex MCP tools, call `status` with `projectDir` set to this workspace first, then pass the returned `deploymentSelector` to `tables`, `data`, `functionSpec`, `logs`, `run`, and env tools. Prefer `blissful-sheep-547` over prod. Enable `convex_cerenity` in Cursor Settings → Tools & MCP (green) so agents besides the Convex plugin can see it.

`insights` is unavailable while MCP is started with `CONVEX_DEPLOY_KEY`.

The current preview/dev deployment has no tables and no functions yet. Use `npx convex dev` for development. Never run `npx convex deploy` unless shipping to production.

If MCP cannot see `blissful-sheep-547`, mint a **deployment** token (`dev:blissful-sheep-547|…` or `prod:…`) from that deployment’s dashboard Deploy keys page and replace `CONVEX_DEPLOY_KEY`. The existing key is a preview project key (`preview:sonny-nabong:cerenity-ai|…`).

## Learned User Preferences

- Keep Convex deploy keys out of git and out of tracked MCP config; store them only in `.env.local`.

## Learned Workspace Facts

- Convex MCP server in this repo is named `convex_cerenity` and targets `blissful-sheep-547`.
- Convex team is `sonny-nabong`, project is `cerenity-ai`, primary MCP deployment is `blissful-sheep-547`.
- Production Convex deployment is `majestic-gazelle-859` and should stay read-only by default.
