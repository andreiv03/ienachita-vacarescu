import { gql } from "graphql-request";

import client from "./graphcms";
import type { PostInterface } from "../interfaces/posts-interfaces";

class PostsService {
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
          category {
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
          }
          category {
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
          category {
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

  async getRelatedPosts(slug: string, category: string): Promise<PostInterface[]> {
    const query = gql`
      query getRelatedPosts($slug: String!, $category: String!) {
        posts(where: {
          slug_not: $slug,
          AND: {
            category: {
              slug: $category
            }
          } 
        }, last: 3) {
          author {
            name
          }
          category {
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

    const result = await client.request(query, { slug, category });
    return result.posts;
  }

  async getCategoryPosts(slug: string): Promise<PostInterface[]> {
    const query = gql`
      query getCategoryPosts($slug: String!) {
        
      }
    `;

    const result = await client.request(query, { slug });
    return result.post;
  }
};

const postsService = new PostsService();
export default postsService;