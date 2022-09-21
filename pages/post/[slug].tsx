import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { RiFacebookFill, RiLinkedinFill, RiTwitterFill } from "react-icons/ri";
import { PortableText } from "@portabletext/react";
import moment from "moment";

import type { Post } from "../../services/post.service";
import { getPortableComponents } from "../../utils/portable-components";

import styles from "../../styles/pages/post.module.scss";

interface Props {
  host: string;
  post: Post;
};

const Post: NextPage<Props> = ({ host, post }) => {
  return (
    <div className={styles.page}>
      <Head>
        <meta itemProp="name" content={post.title} />
        <meta property="og:title" content={post.title} />
        <meta property="og:url" content={`${host}post/${post.slug}`} />
        <meta name="twitter:title" content={post.title} />
        <title>{post.title}</title>
      </Head>

      <article>
        <h1 className={styles.title}>{post.title}</h1>
        
        <div className={styles.details}>
          <h3>Written by <span>{post.author}</span></h3>
          <h3>Posted on <span>{moment(post.createdAt).format("MMMM DD, YYYY")}</span></h3>
        </div>
        
        <div className={styles.content}>
          <PortableText
            value={post.body}
            components={getPortableComponents(styles)}
          />
        </div>

        <div className={styles.social_media}>
          <h5>
            <span>Did you find it interesting?</span>
            <span>Share with a friend.</span>
          </h5>

          <div className={styles.icons}>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${host}post/${post.slug}`} rel="noreferrer" target="_blank"><RiFacebookFill /></a>
            <a href={`http://www.linkedin.com/shareArticle?mini=true&url=${host}post/${post.slug}`} rel="noreferrer" target="_blank"><RiLinkedinFill /></a>
            <a href={`https://twitter.com/intent/tweet?text=${host}post/${post.slug}`} rel="noreferrer" target="_blank"><RiTwitterFill /></a>
          </div>
        </div>
      </article>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { getAllPostSlugs } = await import("../../services/post.service");
  const slugs = await getAllPostSlugs();

  return {
    fallback: "blocking",
    paths: slugs.map(slug => ({ params: { slug } }))
  };
};

export const getStaticProps: GetStaticProps<Props, { slug: string; }> = async ({ params }) => {
  const { slug = "" } = params!;

  const { getPost } = await import("../../services/post.service");
  const post = await getPost(slug);

  return {
    props: {
      host: process.env.HOST || "",
      post
    },
    revalidate: 60
  };
};

export default Post;