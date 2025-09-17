import { getAllCategories } from "@/services/category-service";
import { getAllPosts } from "@/services/post-service";
import type { Category } from "@/types/category";
import type { Post } from "@/types/post";

import CategoriesMenu from "@/app/_components/categories-menu";
import PostCard from "@/app/_components/post-card";
import styles from "@/styles/pages/home.module.scss";

export const revalidate = 60;

async function getData(): Promise<{ categories: Category[]; posts: Post[] }> {
  const [categories, posts] = await Promise.all([getAllCategories(), getAllPosts()]);
  return { categories, posts };
}

export default async function Home() {
  const { categories, posts } = await getData();

  return (
    <div className={styles["page"]}>
      <CategoriesMenu categories={categories} />

      <div className={styles["content"]}>
        <div className={styles["hero_section"]}>
          <h1>School&apos;s Latest News</h1>
          <p>
            The school&apos;s central/core values became dignity, professionalism, renewal,
            creativity and reinterpretation.
          </p>
        </div>

        <div className={styles["posts"]}>
          {posts.map((post, index) => (
            <PostCard index={index} key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
