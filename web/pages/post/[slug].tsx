import type { NextPage } from "next";

import { Post } from "../../services/post.service";

import styles from "../../styles/pages/post.module.scss";

interface GetStaticProps {
  params: {
    slug: string;
  };
};

interface Props {
  post: Post;
};

const Post: NextPage<Props> = ({ post }) => {
  return (
    <div className={styles.page}>

    </div>
  );
}

export const getStaticPaths = async () => {
  const { getAllPostSlugs } = await import("../../services/post.service");
  const slugs = await getAllPostSlugs();

  return {
    paths: slugs.map(slug => ({ params: { slug } })),
    fallback: "blocking"
  };
}

export const getStaticProps = async ({ params }: GetStaticProps) => {
  const { getPost } = await import("../../services/post.service");
  const post = await getPost(params.slug);

  return {
    props: { post },
    revalidate: 60
  };
}

export default Post;