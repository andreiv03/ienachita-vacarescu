import type { RichTextContent } from "@graphcms/rich-text-types";
import type { AuthorInterface } from "./authors-interfaces";
import type { CategoryInterface } from "./categories-interfaces";

export interface PostInterface {
  author: AuthorInterface;
  category: CategoryInterface;
  content: {
    raw: RichTextContent;
  };
  createdAt: string;
  excerpt: string;
  image: {
    url: string;
  };
  slug: string;
  title: string;
};