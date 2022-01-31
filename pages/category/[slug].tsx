import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import "moment/locale/ro";

import type { PostInterface } from "../../interfaces/posts-interfaces";

import styles from "../../styles/pages/post.module.scss";

interface PropsInterface {
  post: PostInterface;
  relatedPosts: PostInterface[];
};

const Category: NextPage<PropsInterface> = ({ post, relatedPosts }) => {
  return (
    <div className={styles.page}>
    </div>
  );
}

export default Category;