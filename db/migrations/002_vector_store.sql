-- Future unstructured store if Cerenity leaves Convex RAG for Postgres.
-- Not used by the current Convex runtime.

CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE document_chunks (
  id UUID PRIMARY KEY,
  source TEXT NOT NULL,
  title TEXT NOT NULL,
  chunk TEXT NOT NULL,
  embedding vector(1536) NOT NULL
);

CREATE INDEX document_chunks_by_source ON document_chunks (source);
