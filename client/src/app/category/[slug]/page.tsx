import { notFound } from "next/navigation";

import { getCategory, getAllCategories, getAllCategorySlugs } from "@/services/category-service";
import { getCategoryPosts } from "@/services/post-service";
import type { Category } from "@/types/category";

import CategoriesMenu from "@/app/_components/categories-menu";
import PostCard from "@/app/_components/post-card";
import styles from "@/styles/pages/home.module.scss";

export const revalidate = 60;

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const slugs = await getAllCategorySlugs();
  return slugs.map((slug) => ({ slug }));
}

type PageProps = { params: { slug: string } };

export default async function CategoryPage({ params }: PageProps) {
  const slug = params.slug;

  const [category, categories, posts] = await Promise.all([
    getCategory(slug).catch(() => null as Category | null),
    getAllCategories(),
    getCategoryPosts(slug),
  ]);

  if (!category) {
    notFound();
  }

  return (
    <div className={styles["page"]}>
      <CategoriesMenu categories={categories} activeSlug={category.slug} />

      <div className={styles["content"]}>
        <div className={styles["hero_section"]}>
          <h1>{category.name}</h1>
          <p>
            The school&apos;s central/core values became dignity, professionalism, renewal,
            creativity and reinterpretation.
          </p>
          <h6>{posts.length === 1 ? "1 result" : `${posts.length} results`}</h6>
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
