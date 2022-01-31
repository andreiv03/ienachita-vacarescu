import { gql } from "graphql-request";

import client from "./graphcms";
import type { CategoryInterface } from "../interfaces/categories-interfaces";

class CategoriesServiceClass {
  async getCategories(): Promise<CategoryInterface[]> {
    const query = gql`
      query getCategories {
        categories {
          name
          slug
        }
      }
    `;

    const result = await client.request(query);
    return result.categories;
  }
}

const CategoriesService = new CategoriesServiceClass();
export default CategoriesService;