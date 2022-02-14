import type { NextApiRequest, NextApiResponse } from "next";
import { GraphQLClient, gql } from "graphql-request";

import { GRAPHCMS_API, GRAPHCMS_TOKEN } from "../../constants";

const createComment = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!GRAPHCMS_API) throw new Error("GraphCMS API not found!");
    if (!GRAPHCMS_TOKEN) throw new Error("GraphCMS Token not found!");

    const { email, message, name, slug } = req.body;

    const client = new GraphQLClient(GRAPHCMS_API, {
      headers: {
        Authorization: `Bearer ${GRAPHCMS_TOKEN}` 
      }
    });

    const query = gql`
      mutation CreateComment($email: String!, $message: String!, $name: String!, $slug: String!) {
        createComment(data: {
          email: $email,
          message: $message,
          name: $name,
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

    await client.request(query, { email, message, name, slug });
    return res.status(200).json({ message: "Success!" });
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