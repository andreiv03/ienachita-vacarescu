import { gql } from "graphql-request";

import client from "./graphcms";
import type { PostInterface } from "../interfaces/posts-interfaces";

class PostsServiceClass {
  async getPost(slug: string): Promise<PostInterface> {
    const query = gql`
      query getPost($slug: String!) {
        post(where: {
          slug: $slug
        }) {
          author {
            name
            photo {
              url
            }
          }
          categories {
            name
            slug
          }
          content {
            raw
          }
          createdAt
          excerpt
          image {
            url
          }
          slug
          title
        }
      }
    `;

    const result = await client.request(query, { slug });
    return result.post;
  }

  async getAllPosts(): Promise<PostInterface[]> {
    const query = gql`
      query getAllPosts {
        posts {
          author {
            name
            photo {
              url
            }
          }
          categories(first: 2) {
            name
            slug
          }
          createdAt
          excerpt
          image {
            url
          }
          slug
          title
        }
      }
    `;

    const result = await client.request(query);
    return result.posts;
  }

  async getRecentPosts(): Promise<PostInterface[]> {
    const query = gql`
      query getRecentPosts {
        posts(orderBy: createdAt_ASC, last: 3) {
          author {
            name
          }
          categories(first: 2) {
            name
            slug
          }
          createdAt
          excerpt
          image {
            url
          }
          slug
          title
        }
      }
    `;

    const result = await client.request(query);
    return result.posts;
  }

  async getRelatedPosts(slug: string, categories: string[]): Promise<PostInterface[]> {
    const query = gql`
      query getRelatedPosts($slug: String!, $categories: [String!]) {
        posts(where: {
          slug_not: $slug,
          AND: {
            categories_some: {
              slug_in: $categories
            }
          } 
        }, last: 3) {
          author {
            name
          }
          categories(first: 2) {
            name
            slug
          }
          createdAt
          excerpt
          image {
            url
          }
          slug
          title
        }
      }
    `;

    const result = await client.request(query, { slug, categories });
    return result.posts;
  }
}

const PostsService = new PostsServiceClass();
export default PostsService;