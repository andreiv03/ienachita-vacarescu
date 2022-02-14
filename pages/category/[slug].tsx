import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";

import type { PostInterface } from "../../interfaces/posts-interfaces";

import styles from "../../styles/pages/post.module.scss";

interface PropsInterface {
  posts: PostInterface[];
};

interface GetStaticPropsInterface {
  params: {
    slug: string;
  };
};

const Category: NextPage<PropsInterface> = ({ posts }) => {
  return (
    <div className={styles.page}>
    </div>
  );
}

export const getStaticPaths = async () => {
  const { default: categoriesService } = await import("../../services/categories-service");
  const posts = await categoriesService.getCategories();

  return {
    paths: posts.map(({ slug }) => ({ params: { slug } })),
    fallback: "blocking"
  };
}

export const getStaticProps = async ({ params }: GetStaticPropsInterface) => {
  const { default: postsService } = await import("../../services/posts-service");
  const post = await postsService.getPost(params.slug);

  const { default: cateogriesService } = await import("../../services/categories-service");
  const categories = await cateogriesService.getCategories();

  return {
    props: {
      post,
      categories
    },
    revalidate: 60
  };
}

export default Category;