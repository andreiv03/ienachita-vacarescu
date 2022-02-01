import type { NextApiRequest, NextApiResponse } from "next";
import { GraphQLClient, gql } from "graphql-request";

import { GRAPHCMS_API, GRAPHCMS_TOKEN } from "../../constants";

const createComment = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!GRAPHCMS_API) throw new Error("GraphCMS API not found!");
    if (!GRAPHCMS_TOKEN) throw new Error("GraphCMS Token not found!");
    const { name, email, message, slug } = req.body;

    const client = new GraphQLClient(GRAPHCMS_API, {
      headers: {
        Authorization: `Bearer ${GRAPHCMS_TOKEN}` 
      }
    });

    const query = gql`
      mutation CreateComment($name: String!, $email: String!, $message: String!, $slug: String!) {
        createComment(data: {
          name: $name,
          email: $email,
          message: $message,
          post: {
            connect: {
              slug: $slug
            }
          }
        }) {
          id
        }
      }
    `;

    await client.request(query, { name, email, message, slug });
    return res.status(200).json({ message: "Comment submitted!" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST": return createComment(req, res);
    default: return res.status(404).json({ message: "API route not found!" });
  }
}

export default handler;