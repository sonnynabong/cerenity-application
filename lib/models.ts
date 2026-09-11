export const AI_PROVIDERS = ["openai", "openrouter"] as const;

export type AiProvider = (typeof AI_PROVIDERS)[number];

export type ChatModelOption = {
  id: string;
  provider: AiProvider;
  apiModel: string;
  label: string;
};

export const CHAT_MODELS: ChatModelOption[] = [
  {
    id: "openai:gpt-4o-mini",
    provider: "openai",
    apiModel: "gpt-4o-mini",
    label: "GPT-4o mini",
  },
  {
    id: "openai:gpt-4o",
    provider: "openai",
    apiModel: "gpt-4o",
    label: "GPT-4o",
  },
  {
    id: "openai:gpt-4.1-mini",
    provider: "openai",
    apiModel: "gpt-4.1-mini",
    label: "GPT-4.1 mini",
  },
  {
    id: "openrouter:openai/gpt-4o-mini",
    provider: "openrouter",
    apiModel: "openai/gpt-4o-mini",
    label: "GPT-4o mini",
  },
  {
    id: "openrouter:anthropic/claude-sonnet-4",
    provider: "openrouter",
    apiModel: "anthropic/claude-sonnet-4",
    label: "Claude Sonnet 4",
  },
  {
    id: "openrouter:google/gemini-2.5-flash",
    provider: "openrouter",
    apiModel: "google/gemini-2.5-flash",
    label: "Gemini 2.5 Flash",
  },
  {
    id: "openrouter:meta-llama/llama-3.3-70b-instruct",
    provider: "openrouter",
    apiModel: "meta-llama/llama-3.3-70b-instruct",
    label: "Llama 3.3 70B",
  },
];

export const DEFAULT_CHAT_MODEL_ID = "openai:gpt-4o-mini";

export function getChatModelOption(modelId: string): ChatModelOption {
  const match = CHAT_MODELS.find((model) => model.id === modelId);
  if (!match) {
    throw new Error(`Unknown chat model: ${modelId}`);
  }
  return match;
}

export function modelsForKeys(keys: {
  openai: boolean;
  openrouter: boolean;
}): ChatModelOption[] {
  return CHAT_MODELS.filter((model) =>
    model.provider === "openai" ? keys.openai : keys.openrouter,
  );
}

export function defaultModelId(models: ChatModelOption[]): string | null {
  if (models.some((model) => model.id === DEFAULT_CHAT_MODEL_ID)) {
    return DEFAULT_CHAT_MODEL_ID;
  }
  return models[0]?.id ?? null;
}
