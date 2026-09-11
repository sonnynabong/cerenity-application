import { openai } from "@ai-sdk/openai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { getChatModelOption } from "../lib/models";
import { requireProviderKey } from "./providerKeys";

export function chatLanguageModel(modelId: string) {
  const spec = getChatModelOption(modelId);
  requireProviderKey(spec.provider);
  if (spec.provider === "openai") {
    return openai(spec.apiModel);
  }
  return createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
  }).chat(spec.apiModel);
}

export function embeddingLanguageModel() {
  if (process.env.OPENAI_API_KEY) {
    return openai.embedding("text-embedding-3-small");
  }
  if (process.env.OPENROUTER_API_KEY) {
    return createOpenRouter({
      apiKey: process.env.OPENROUTER_API_KEY,
    }).textEmbeddingModel("openai/text-embedding-3-small");
  }
  throw new Error(
    "Embeddings need OPENAI_API_KEY or OPENROUTER_API_KEY on the Convex deployment.",
  );
}
