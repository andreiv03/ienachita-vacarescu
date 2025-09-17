import groq from "groq";

import { sanityClient } from "@/config/sanity";
import type { Category } from "@/types/category";

export const getCategory = async (slug: string) => {
  const query = groq`
    *[_type == "category" && slug.current == $slug][0] {
      name,
      "slug": slug.current
    }
  `;

  const category: Category = await sanityClient.fetch(query, { slug });
  return category;
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

export const getAllCategorySlugs = async () => {
  const query = groq`
    *[_type == "category"].slug.current
  `;

  const slugs: string[] = await sanityClient.fetch(query);
  return slugs;
};
