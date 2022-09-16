import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { RiFacebookFill, RiLinkedinFill, RiTwitterFill } from "react-icons/ri";
import { PortableText } from "@portabletext/react";
import moment from "moment";
import type { ParsedUrlQuery } from "querystring";

import type { Post } from "../../services/post.service";
import { portableComponents } from "../../utils/portable-components";

import styles from "../../styles/pages/post.module.scss";

interface Props {
  post: Post;
};

interface Params extends ParsedUrlQuery {
  slug: string;
};

const Post: NextPage<Props> = ({ post }) => {
  return (
    <div className={styles.page}>
      <Head>
        <title>{post.title}</title>
        <meta property="og:title" content={post.title} />
        <meta name="twitter:title" content={post.title} />
      </Head>

      <article>
        <h1 className={styles.title}>{post.title}</h1>
        
        <div className={styles.details}>
          <h3>Written by <Link href={`/author/${post.author.slug}`}>{post.author.name}</Link></h3>
          <h4>Posted on <span>{moment(post.createdAt).format("MMMM DD, YYYY")}</span></h4>
        </div>
        
        <div className={styles.content}>
          <PortableText
            value={post.body}
            components={portableComponents}
          />
        </div>

        <div className={styles.social_media}>
          <h5>
            <span>Did you find it interesting?</span>
            <span>Share with a friend.</span>
          </h5>

          <div className={styles.icons}>
            <a href="https://www.facebook.com/"><RiFacebookFill /></a>
            <a href="https://www.facebook.com/"><RiLinkedinFill /></a>
            <a href="https://www.facebook.com/"><RiTwitterFill /></a>
          </div>
        </div>
      </article>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { getAllPostSlugs } = await import("../../services/post.service");
  const slugs = await getAllPostSlugs();

  return {
    fallback: "blocking",
    paths: slugs.map(slug => ({ params: { slug } }))
  };
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
  const { slug = "" } = params!;

  const { getPost } = await import("../../services/post.service");
  const post = await getPost(slug);

  return {
    props: { post },
    revalidate: 60
  };
}

export default Post;