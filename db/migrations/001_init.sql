-- Portable Postgres contract mirroring convex/schema.ts.
-- Convex does not execute this file. Apply it only if you swap to Postgres.

CREATE TABLE employees (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  department TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  location TEXT NOT NULL
);

CREATE INDEX employees_by_name ON employees (name);

CREATE TABLE products (
  id UUID PRIMARY KEY,
  sku TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price_cents INTEGER NOT NULL,
  stock INTEGER NOT NULL,
  owner TEXT NOT NULL
);

CREATE INDEX products_by_sku ON products (sku);
CREATE INDEX products_by_name ON products (name);

CREATE TABLE threads (
  id UUID PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL
);

CREATE TABLE messages (
  id UUID PRIMARY KEY,
  thread_id UUID NOT NULL REFERENCES threads (id),
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  citations JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL
);

CREATE INDEX messages_by_thread ON messages (thread_id, created_at);
