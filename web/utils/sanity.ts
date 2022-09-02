import sanityClientConstructor, { SanityClient } from "@sanity/client";
import constants from "../constants";

export const sanityClient: SanityClient = sanityClientConstructor({
  dataset: constants.SANITY_DATASET,
  projectId: constants.SANITY_PROJECT_ID,
  useCdn: true
});