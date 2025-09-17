import groq from "groq";

import { sanityClient } from "@/config/sanity";
import type { Post } from "@/types/post";

export const getPost = async (slug: string) => {
  const query = groq`
    *[_type == "post" && slug.current == $slug][0] {
      "author": author -> name,
      body,
      "category": {
        "name": category -> name,
        "slug": category -> slug.current
      },
      createdAt,
      "slug": slug.current,
      title
    }
  `;

  const post: Post = await sanityClient.fetch(query, { slug });
  return post;
};

export const getAllPosts = async () => {
  const query = groq`
    *[_type == "post" && createdAt < now()] | order(createdAt desc) {
      "category": {
        "name": category -> name,
        "slug": category -> slug.current
      },
      createdAt,
      "slug": slug.current,
      title
    }
  `;

  const posts: Post[] = await sanityClient.fetch(query);
  return posts;
};

export const getAllPostSlugs = async () => {
  const query = groq`
    *[_type == "post"].slug.current
  `;

  const slugs: string[] = await sanityClient.fetch(query);
  return slugs;
};

export const getCategoryPosts = async (slug: string) => {
  const query = groq`
    *[_type == "post" && category -> slug.current == $slug] {
      "category": {
        "name": category -> name,
        "slug": category -> slug.current
      },
      createdAt,
      "slug": slug.current,
      title
    }
  `;

  const posts: Post[] = await sanityClient.fetch(query, { slug });
  return posts;
};
