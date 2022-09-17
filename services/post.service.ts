import groq from "groq";
import { sanityClient } from "../utils/sanity";

export interface Post {
  author: {
    name: string;
    slug: string;
  };
  body: any;
  categories: {
    name: string;
    slug: string;
  }[];
  createdAt: string;
  title: string;
};

export const getPost = async (slug: string) => {
  const query = groq`
    *[_type == "post" && slug.current == $slug][0] {
      "author": {
        "name": author -> name,
        "slug": author -> slug.current
      },
      body,
      "categories": categories[] -> {
        "name": name,
        "slug": slug.current
      },
      createdAt,
      title
    }
  `;

  const post: Post = await sanityClient.fetch(query, { slug });
  return post;
}

export const getAllPostSlugs = async () => {
  const query = groq`
    *[_type == "post" && defined(slug.current)].slug.current
  `;

  const slugs: string[] = await sanityClient.fetch(query);
  return slugs;
}