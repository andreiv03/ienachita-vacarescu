import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  apiVersion: "2025-09-12",
  dataset: "production",
  perspective: "published",
  projectId: "s8h4ef2x",
  useCdn: true,
});
