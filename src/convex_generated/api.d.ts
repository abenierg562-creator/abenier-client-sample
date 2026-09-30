/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as analyseClinicNiche from "../analyseClinicNiche.js";
import type * as apiKeyManager from "../apiKeyManager.js";
import type * as apollo from "../apollo.js";
import type * as auth from "../auth.js";
import type * as crons from "../crons.js";
import type * as dashboard from "../dashboard.js";
import type * as http from "../http.js";
import type * as jobIntelligenceEngine from "../jobIntelligenceEngine.js";
import type * as jobIntelligenceScheduler from "../jobIntelligenceScheduler.js";
import type * as leads from "../leads.js";
import type * as pharmacyScraper from "../pharmacyScraper.js";
import type * as pushNotifications from "../pushNotifications.js";
import type * as resend from "../resend.js";
import type * as socialLeadsScraper from "../socialLeadsScraper.js";
import type * as updateJobIntelligence from "../updateJobIntelligence.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  analyseClinicNiche: typeof analyseClinicNiche;
  apiKeyManager: typeof apiKeyManager;
  apollo: typeof apollo;
  auth: typeof auth;
  crons: typeof crons;
  dashboard: typeof dashboard;
  http: typeof http;
  jobIntelligenceEngine: typeof jobIntelligenceEngine;
  jobIntelligenceScheduler: typeof jobIntelligenceScheduler;
  leads: typeof leads;
  pharmacyScraper: typeof pharmacyScraper;
  pushNotifications: typeof pushNotifications;
  resend: typeof resend;
  socialLeadsScraper: typeof socialLeadsScraper;
  updateJobIntelligence: typeof updateJobIntelligence;
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

export declare const components: {};
