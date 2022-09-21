import groq from "groq";
import { sanityClient } from "../utils/sanity";

export interface Category {
  name: string;
  slug: string;
};

export const getAllCategories = async () => {
  const query = groq`
    *[_type == "category"] {
      name,
      "slug": slug.current
    }
  `;

  const category: Category[] = await sanityClient.fetch(query);
  return category;
};