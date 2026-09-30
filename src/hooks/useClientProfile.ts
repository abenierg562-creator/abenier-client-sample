import { useQuery } from "convex/react";
import { useSearchParams } from "react-router-dom";
import { api } from "../convex_generated/api";

/**
 * Reads ?client= from the URL and fetches the matching profile from Convex.
 * Returns null while loading or if the slug is not found.
 */
export function useClientProfile() {
  const [searchParams] = useSearchParams();
  const slug = searchParams.get("client") ?? "";

  // useQuery returns undefined while loading, null if not found
  const profile = useQuery(api.dashboard.getClientProfileBySlug, slug ? { slug } : "skip");

  return {
    profile: profile ?? null,
    isLoading: profile === undefined,
    slug,
  };
}
