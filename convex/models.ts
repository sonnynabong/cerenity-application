import { v } from "convex/values";
import { query } from "./_generated/server";
import { defaultModelId, modelsForKeys } from "../lib/models";
import { providerKeys } from "./providerKeys";

export const list = query({
  args: {},
  returns: v.object({
    models: v.array(
      v.object({
        id: v.string(),
        label: v.string(),
        provider: v.union(v.literal("openai"), v.literal("openrouter")),
      }),
    ),
    defaultModelId: v.union(v.string(), v.null()),
    hasOpenAI: v.boolean(),
    hasOpenRouter: v.boolean(),
  }),
  handler: async () => {
    const keys = providerKeys();
    const models = modelsForKeys(keys).map((model) => ({
      id: model.id,
      label: model.label,
      provider: model.provider,
    }));
    return {
      models,
      defaultModelId: defaultModelId(modelsForKeys(keys)),
      hasOpenAI: keys.openai,
      hasOpenRouter: keys.openrouter,
    };
  },
});
