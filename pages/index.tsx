import type { NextPage } from "next";
import dynamic from "next/dynamic";

import type { PostInterface } from "../interfaces/posts-interfaces";

import styles from "../styles/pages/home.module.scss";
const Card = dynamic(() => import("../components/card"));

interface PropsInterface {
  posts: PostInterface[];
};

const Home: NextPage<PropsInterface> = ({ posts }) => {
  return (
    <div className={styles.page}>
      <div className={styles.hero_section}>

      </div>

      <div className={styles.section}>
        <div className={styles.posts}>
          {posts.map((post, index) => (
            <Card key={index} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}

export const getStaticProps = async () => {
  const { default: postsService } = await import("../services/posts-service");
  const posts = await postsService.getAllPosts();

  const { default: cateogriesService } = await import("../services/categories-service");
  const categories = await cateogriesService.getCategories();

  return {
    props: {
      posts,
      categories
    },
    revalidate: 60
  };
}

export default Home;