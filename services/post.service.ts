import groq from "groq";
import { sanityClient } from "../utils/sanity";

export interface Post {
  _createdAt: string;
  author: {
    name: string;
    slug: string;
  },
  body: any;
  categories: string[];
  title: string;
};

export const getPost = async (slug: string) => {
  const query = groq`
    *[_type == "post" && slug.current == $slug][0] {
      _createdAt,
      "author": {
        "name": author->name,
        "slug": author->slug.current
      },
      body,
      "categories": categories[]->title,
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