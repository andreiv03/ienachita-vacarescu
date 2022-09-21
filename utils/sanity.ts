import SanityClientConstructor, { SanityClient } from "@sanity/client";

export const sanityClient: SanityClient = SanityClientConstructor({
  apiVersion: "2022-09-01",
  dataset: "production",
  projectId: "z5pw94sr",
  useCdn: true
});