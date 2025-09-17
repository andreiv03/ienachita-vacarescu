import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RiFacebookFill, RiLinkedinFill, RiTwitterFill } from "react-icons/ri";

import { getPost, getAllPostSlugs } from "@/services/post-service";
import type { Post } from "@/types/post";

import PortableTextClient from "@/app/_components/portable-text";
import styles from "@/styles/pages/post.module.scss";

export const revalidate = 60;

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

async function getSiteUrl(): Promise<string> {
  const siteUrl = process.env["NEXT_PUBLIC_SITE_URL"]?.replace(/\/+$/, "");
  if (siteUrl) {
    return siteUrl;
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { headers } = require("next/headers") as typeof import("next/headers");
    const h = await headers();
    const proto = h.get("x-forwarded-proto") ?? "http";
    const host = h.get("x-forwarded-host") ?? h.get("host");
    if (host) {
      return `${proto}://${host}`;
    }
  } finally {
    return "";
  }
}

type PageProps = { params: { slug: string } };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getPost(params.slug).catch(() => null);
  if (!post) return { title: "Post not found" };

  const siteUrl = await getSiteUrl();
  const url = siteUrl ? `${siteUrl}/post/${post.slug}` : `/post/${post.slug}`;

  return {
    title: post.title,
    openGraph: {
      title: post.title,
      url,
      type: "article",
    },
    twitter: {
      card: "summary",
      title: post.title,
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const post = await getPost(params.slug).catch(() => null as Post | null);
  if (!post) {
    notFound();
  }

  const siteUrl = await getSiteUrl();
  const shareUrl = encodeURIComponent(
    siteUrl ? `${siteUrl}/post/${post.slug}` : `/post/${post.slug}`,
  );

  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });

  return (
    <div className={styles["page"]}>
      <article>
        <h1 className={styles["title"]}>{post.title}</h1>

        <div className={styles["details"]}>
          <h3>
            Written by <span>{post.author}</span>
          </h3>
          <h3>
            Posted on <span>{formattedDate}</span>
          </h3>
        </div>

        <div className={styles["content"]}>
          <PortableTextClient styles={styles} value={post.body} />
        </div>

        <div className={styles["social_media"]}>
          <h5>
            <span>Did you find it interesting?</span>
            <span>Share with a friend.</span>
          </h5>

          <div className={styles["icons"]}>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
              rel="noreferrer"
              target="_blank"
            >
              <RiFacebookFill />
            </a>
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}`}
              rel="noreferrer"
              target="_blank"
            >
              <RiLinkedinFill />
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${shareUrl}`}
              rel="noreferrer"
              target="_blank"
            >
              <RiTwitterFill />
            </a>
          </div>
        </div>
      </article>
    </div>
  );
}
