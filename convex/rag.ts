import { RAG } from "@convex-dev/rag";
import { components } from "./_generated/api";
import { embeddingLanguageModel } from "./ai";

let ragSingleton: RAG | undefined;

export function getRag(): RAG {
  ragSingleton ??= new RAG(components.rag, {
    textEmbeddingModel: embeddingLanguageModel(),
    embeddingDimension: 1536,
  });
  return ragSingleton;
}

export const POLICY_NAMESPACE = "cerenity-policies";
