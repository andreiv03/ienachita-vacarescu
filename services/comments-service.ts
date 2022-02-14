import { gql } from "graphql-request";

import client from "./graphcms";
import type { CommentInterface, CommentFormDataInterface } from "../interfaces/comments-interfaces";

class CommentsService {
  async getComments(slug: string): Promise<CommentInterface[]> {
    const query = gql`
      query getComments($slug: String!) {
        comments(where: {
          post: {
            slug: $slug
          }
        }) {
          createdAt
          message
          name
        }
      }
    `;

    const result = await client.request(query, { slug });
    return result.comments;
  }

  async submitComment(formData: CommentFormDataInterface, slug: string) {
    const result = await fetch("/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ...formData, slug })
    });

    return result.json();
  }
};

const commentsService = new CommentsService();
export default commentsService;