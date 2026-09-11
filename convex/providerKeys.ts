import type { AiProvider } from "../lib/models";

export function providerKeys() {
  return {
    openai: Boolean(process.env.OPENAI_API_KEY),
    openrouter: Boolean(process.env.OPENROUTER_API_KEY),
  };
}

export function requireProviderKey(provider: AiProvider): void {
  const keys = providerKeys();
  if (provider === "openai" && !keys.openai) {
    throw new Error(
      "OPENAI_API_KEY is not set on the Convex deployment. Run `npx convex env set OPENAI_API_KEY`.",
    );
  }
  if (provider === "openrouter" && !keys.openrouter) {
    throw new Error(
      "OPENROUTER_API_KEY is not set on the Convex deployment. Run `npx convex env set OPENROUTER_API_KEY`.",
    );
  }
}

export function requireAnyProviderKey(): void {
  const keys = providerKeys();
  if (!keys.openai && !keys.openrouter) {
    throw new Error(
      "Set OPENAI_API_KEY and/or OPENROUTER_API_KEY on the Convex deployment, then re-run seed:run.",
    );
  }
}
