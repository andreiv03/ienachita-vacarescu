import { GraphQLClient } from "graphql-request";
import { GRAPHCMS_API } from "../constants"; 

const client = new GraphQLClient(GRAPHCMS_API);
export default client;