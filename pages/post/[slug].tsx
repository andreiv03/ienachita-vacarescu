import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { RiFacebookFill, RiLinkedinFill, RiTwitterFill } from "react-icons/ri";
import { PortableText } from "@portabletext/react";
import moment from "moment";
import type { ParsedUrlQuery } from "querystring";

import type { Post } from "../../services/post.service";
import { portableComponents } from "../../utils/portable-components";

import styles from "../../styles/pages/post.module.scss";

interface Props {
  host: string;
  post: Post;
};

interface Params extends ParsedUrlQuery {
  slug: string;
};

const Post: NextPage<Props> = ({ host, post }) => {
  const router = useRouter();

  return (
    <div className={styles.page}>
      <Head>
        <meta itemProp="name" content={post.title} />
        <meta property="og:title" content={post.title} />
        <meta property="og:url" content={`${host}${router.asPath}`} />
        <meta name="twitter:title" content={post.title} />
        <title>{post.title}</title>
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
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${host}${router.asPath}`} rel="noreferrer" target="_blank"><RiFacebookFill /></a>
            <a href={`http://www.linkedin.com/shareArticle?mini=true&url=${host}${router.asPath}`} rel="noreferrer" target="_blank"><RiLinkedinFill /></a>
            <a href={`https://twitter.com/intent/tweet?text=${host}${router.asPath}`} rel="noreferrer" target="_blank"><RiTwitterFill /></a>
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
    props: {
      host: process.env.HOST || "",
      post
    },
    revalidate: 60
  };
}

export default Post;