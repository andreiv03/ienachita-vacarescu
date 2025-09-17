import type { PortableTextBlock } from "@portabletext/react";

export interface Post {
  author: string;
  body: PortableTextBlock[];
  category: {
    name: string;
    slug: string;
  };
  createdAt: string;
  slug: string;
  title: string;
}
