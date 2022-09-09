import createSchema from "part:@sanity/base/schema-creator";
import schemaTypes from "all:part:@sanity/base/schema-type";

import author from "./author";
import blockContent from "./blockContent";
import category from "./category";
import post from "./post";

export default createSchema({
  name: "default",
  types: schemaTypes.concat([
    author,
    blockContent,
    category,
    post
  ])
});