import sanityClientConstructor, { SanityClient } from "@sanity/client";

export const sanityClient: SanityClient = sanityClientConstructor({
  apiVersion: "2022-09-01",
  dataset: "production",
  projectId: "z5pw94sr",
  useCdn: true
});