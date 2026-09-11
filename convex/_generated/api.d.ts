/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as ai from "../ai.js";
import type * as chatActions from "../chatActions.js";
import type * as employees from "../employees.js";
import type * as messages from "../messages.js";
import type * as migrations from "../migrations.js";
import type * as models from "../models.js";
import type * as policyDocs from "../policyDocs.js";
import type * as products from "../products.js";
import type * as providerKeys from "../providerKeys.js";
import type * as rag from "../rag.js";
import type * as seed from "../seed.js";
import type * as seedMutations from "../seedMutations.js";
import type * as threads from "../threads.js";
import type * as validators from "../validators.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  ai: typeof ai;
  chatActions: typeof chatActions;
  employees: typeof employees;
  messages: typeof messages;
  migrations: typeof migrations;
  models: typeof models;
  policyDocs: typeof policyDocs;
  products: typeof products;
  providerKeys: typeof providerKeys;
  rag: typeof rag;
  seed: typeof seed;
  seedMutations: typeof seedMutations;
  threads: typeof threads;
  validators: typeof validators;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {
  rag: import("@convex-dev/rag/_generated/component.js").ComponentApi<"rag">;
  migrations: import("@convex-dev/migrations/_generated/component.js").ComponentApi<"migrations">;
};
