import groq from "groq";
import { sanityClient } from "../utils/sanity";

export interface Post {
  author: {
    name: string;
    slug: string;
  };
  body: any;
  category: {
    name: string;
    slug: string;
  };
  createdAt: string;
  slug: string;
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

export const getAllPostSlugs = async () => {
  const query = groq`
    *[_type == "post"].slug.current
  `;

  const slugs: string[] = await sanityClient.fetch(query);
  return slugs;
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