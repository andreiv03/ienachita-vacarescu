import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { PortableText } from "@portabletext/react";
import moment from "moment";
import type { ParsedUrlQuery } from "querystring";

import type { Post } from "../../services/post.service";

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
      <article>
        <h1 className={styles.title}>{post.title}</h1>
        
        <div className={styles.details}>
          <div className={styles.column}>
            <h3>By <span>{post.author.name}</span></h3>
            <h4>{moment(post._createdAt).format("MMMM DD, YYYY")}</h4>
          </div>

          <div className={styles.column}>
            
          </div>
        </div>
        
        <div className={styles.content}>
          <PortableText
            value={post.body}
          />
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