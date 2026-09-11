"use client";

import { useAction, useMutation, useQuery } from "convex/react";
import { useMemo, useState, useSyncExternalStore } from "react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DEFAULT_CHAT_MODEL_ID } from "@/lib/models";

const THREAD_KEY = "cerenity-thread-id";
const MODEL_KEY = "cerenity-model-id";

const SAMPLE_PROMPTS = [
  "What is the price of SKU CER-104?",
  "Who owns PTO balances?",
  "What is the remote work policy?",
  "Can a remote hire expense a Pulse Band?",
] as const;

function subscribeThread(onChange: () => void) {
  window.addEventListener("cerenity-thread", onChange);
  return () => window.removeEventListener("cerenity-thread", onChange);
}

function readThreadId(): Id<"threads"> | null {
  const value = window.localStorage.getItem(THREAD_KEY);
  return value ? (value as Id<"threads">) : null;
}

function persistThreadId(id: Id<"threads">) {
  window.localStorage.setItem(THREAD_KEY, id);
  window.dispatchEvent(new Event("cerenity-thread"));
}

function subscribeModel(onChange: () => void) {
  window.addEventListener("cerenity-model", onChange);
  return () => window.removeEventListener("cerenity-model", onChange);
}

function readModelId(): string | null {
  return window.localStorage.getItem(MODEL_KEY);
}

function persistModelId(id: string) {
  window.localStorage.setItem(MODEL_KEY, id);
  window.dispatchEvent(new Event("cerenity-model"));
}

type Citation = {
  kind: "structured" | "document";
  title: string;
  snippet: string;
};

export function ChatWindow() {
  const createThread = useMutation(api.threads.create);
  const sendMessage = useAction(api.chatActions.send);
  const threadId = useSyncExternalStore(subscribeThread, readThreadId, () => null);
  const storedModelId = useSyncExternalStore(subscribeModel, readModelId, () => null);
  const modelOptions = useQuery(api.models.list);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const messages = useQuery(
    api.messages.listByThread,
    threadId ? { threadId } : "skip",
  );

  const modelId =
    storedModelId &&
    modelOptions?.models.some((model) => model.id === storedModelId)
      ? storedModelId
      : (modelOptions?.defaultModelId ?? DEFAULT_CHAT_MODEL_ID);

  const openaiModels =
    modelOptions?.models.filter((model) => model.provider === "openai") ?? [];
  const openrouterModels =
    modelOptions?.models.filter((model) => model.provider === "openrouter") ?? [];

  async function ensureThread(): Promise<Id<"threads">> {
    if (threadId) {
      return threadId;
    }
    const created = await createThread({});
    persistThreadId(created);
    return created;
  }

  async function onSend(text: string) {
    const prompt = text.trim();
    if (!prompt || sending) {
      return;
    }
    setSending(true);
    setError(null);
    setDraft("");
    try {
      const activeThreadId = await ensureThread();
      const result = await sendMessage({
        threadId: activeThreadId,
        prompt,
        modelId,
      });
      persistThreadId(result.threadId);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Failed to send");
    } finally {
      setSending(false);
    }
  }

  const empty = !messages || messages.length === 0;

  const statusLabel = useMemo(() => {
    if (sending) {
      return "Retrieving context and generating…";
    }
    return null;
  }, [sending]);

  return (
    <div className="mx-auto flex min-h-full w-full max-w-3xl flex-1 flex-col gap-4 p-4 md:p-8">
      <header className="flex flex-col gap-1">
        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          Cerenity internal
        </p>
        <h1 className="text-2xl font-semibold tracking-tight">Assistant</h1>
        <p className="text-sm text-muted-foreground">
          Answers come from the product catalog, staff directory, and handbook
          excerpts — not model memory. Pick OpenAI or OpenRouter in the model
          menu.
        </p>
      </header>

      <ScrollArea className="min-h-0 flex-1 rounded-xl border bg-card">
        <div className="flex flex-col gap-4 p-4">
          {empty ? (
            <div className="flex flex-col gap-3">
              <p className="text-sm text-muted-foreground">Try a sample question</p>
              <div className="flex flex-col gap-2">
                {SAMPLE_PROMPTS.map((prompt) => (
                  <Button
                    key={prompt}
                    variant="outline"
                    className="h-auto justify-start whitespace-normal py-2 text-left"
                    onClick={() => void onSend(prompt)}
                    disabled={sending}
                  >
                    {prompt}
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <article
                key={message._id}
                className={
                  message.role === "user"
                    ? "ml-8 rounded-xl bg-primary px-3 py-2 text-primary-foreground"
                    : "mr-8 rounded-xl bg-muted px-3 py-2"
                }
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                {message.role === "assistant" && message.citations.length > 0 ? (
                  <CitationList citations={message.citations} />
                ) : null}
              </article>
            ))
          )}
          {statusLabel ? (
            <p className="text-sm text-muted-foreground">{statusLabel}</p>
          ) : null}
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
        </div>
      </ScrollArea>

      <form
        className="flex flex-col gap-2"
        onSubmit={(event) => {
          event.preventDefault();
          void onSend(draft);
        }}
      >
        <Textarea
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Ask about products, people, or policies"
          disabled={sending}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              void onSend(draft);
            }
          }}
        />
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            Enter to send · Shift+Enter for a new line
          </p>
          <div className="flex items-center gap-2">
            {modelOptions && modelOptions.models.length === 0 ? (
              <p className="text-xs text-destructive">
                Set OPENAI_API_KEY or OPENROUTER_API_KEY on Convex
              </p>
            ) : (
              <Select
                value={modelId}
                onValueChange={(value) => {
                  if (typeof value === "string") {
                    persistModelId(value);
                  }
                }}
                disabled={sending || !modelOptions}
              >
                <SelectTrigger className="w-56" size="sm">
                  <SelectValue placeholder="Choose a model" />
                </SelectTrigger>
                <SelectContent align="end">
                  {openaiModels.length > 0 ? (
                    <SelectGroup>
                      <SelectLabel>OpenAI</SelectLabel>
                      {openaiModels.map((model) => (
                        <SelectItem key={model.id} value={model.id}>
                          {model.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  ) : null}
                  {openrouterModels.length > 0 ? (
                    <SelectGroup>
                      <SelectLabel>OpenRouter</SelectLabel>
                      {openrouterModels.map((model) => (
                        <SelectItem key={model.id} value={model.id}>
                          {model.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  ) : null}
                </SelectContent>
              </Select>
            )}
            <Button
            type="submit"
            disabled={
              sending ||
              draft.trim().length === 0 ||
              !modelOptions?.models.length
            }
          >
              Send
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

function CitationList({ citations }: { citations: Citation[] }) {
  return (
    <div className="mt-2 flex flex-col gap-2">
      {citations.map((citation) => (
        <div
          key={`${citation.kind}-${citation.title}-${citation.snippet.slice(0, 24)}`}
          className="rounded-lg border border-border/70 bg-background/70 p-2 text-foreground"
        >
          <div className="flex items-center gap-2">
            <Badge variant={citation.kind === "structured" ? "default" : "secondary"}>
              {citation.kind === "structured" ? "table" : "document"}
            </Badge>
            <p className="text-xs font-medium">{citation.title}</p>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">{citation.snippet}</p>
        </div>
      ))}
    </div>
  );
}
