import type { GetStaticProps, NextPage } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";

import type { Category } from "../services/category.service";
import type { Post } from "../services/post.service";

import styles from "../styles/pages/home.module.scss";
const PostCard = dynamic(() => import("../components/post-card"));

interface Props {
  categories: Category[];
  posts: Post[];
};

const Home: NextPage<Props> = ({ categories, posts }) => {
  return (
    <div className={styles.page}>
      <div className={styles.categories}>
        <h3 className={styles.active}>
          <Link href="/">News</Link>
        </h3>

        {categories.map(category => (
          <h3 key={category.slug}>
            <Link href={`/category/${category.slug}`}>{category.name}</Link>
          </h3>
        ))}
      </div>

      <div className={styles.content}>
        <div className={styles.hero_section}>
          <h1>Announcements</h1>
          <p>The school's central/core values became dignity, professionalism, renewal, creativity and reinterpretation.</p>
        </div>
        
        <div className={styles.posts}>
          {posts.map((post, index) => <PostCard index={index} key={post.slug} post={post} />)}
        </div>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { getAllCategories } = await import("../services/category.service");
  const categories = await getAllCategories();

  const { getAllPosts } = await import("../services/post.service");
  const posts = await getAllPosts();

  return {
    props: {
      categories,
      posts
    },
    revalidate: 60
  };
};

export default Home;