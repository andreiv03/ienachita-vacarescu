import groq from "groq";
import { sanityClient } from "../utils/sanity";

export interface Post {
  body: any;
  categories: string[];
  mainImage: any;
  title: string;
};

export const getPost = async (slug: string) => {
  const query = groq`
    *[_type == "post" && slug.current == $slug][0] {
      body,
      "categories": categories[]->title,
      mainImage,
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