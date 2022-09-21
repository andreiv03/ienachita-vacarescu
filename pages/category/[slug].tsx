import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";

import type { Category } from "../../services/category.service";
import type { Post } from "../../services/post.service";

import styles from "../../styles/pages/home.module.scss";
const PostCard = dynamic(() => import("../../components/post-card"));

interface Props {
  categories: Category[];
  category: Category;
  posts: Post[];
};

const Category: NextPage<Props> = ({ categories, category, posts }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className={styles.page}>
      <div className={styles.categories}>
        <h3><Link href="/">News</Link></h3>
        {categories.map(ctg => (
          <h3 className={ctg.slug === category.slug ? styles.active : ""} key={ctg.slug}>
            <Link href={`/category/${ctg.slug}`}>{ctg.name}</Link>
          </h3>
        ))}

        <h3 onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          Categories
          {isDropdownOpen ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
        </h3>

        <div className={`${styles.dropdown} ${isDropdownOpen ? styles.open : ""}`}>
          <h3><Link href="/">News</Link></h3>
          {categories.map(ctg => (
            <h3 className={ctg.slug === category.slug ? styles.active : ""} key={ctg.slug}>
              <Link href={`/category/${ctg.slug}`}>{ctg.name}</Link>
            </h3>
          ))}
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.hero_section}>
          <h1>{category.name}</h1>
          <p>{`The school's central/core values became dignity, professionalism, renewal, creativity and reinterpretation.`}</p>
          <h6>{posts.length === 1 ? "1 result" : `${posts.length} results`}</h6>
        </div>
        
        <div className={styles.posts}>
          {posts.map((post, index) => <PostCard index={index} key={post.slug} post={post} />)}
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { getAllCategorySlugs } = await import("../../services/category.service");
  const slugs = await getAllCategorySlugs();

  return {
    fallback: "blocking",
    paths: slugs.map(slug => ({ params: { slug } }))
  };
};

export const getStaticProps: GetStaticProps<Props, { slug: string; }> = async ({ params }) => {
  const { slug = "" } = params!;

  const { getCategory, getAllCategories } = await import("../../services/category.service");
  const categories = await getAllCategories();
  const category = await getCategory(slug);

  const { getCategoryPosts } = await import("../../services/post.service");
  const posts = await getCategoryPosts(slug);

  return {
    props: {
      categories,
      category,
      posts
    },
    revalidate: 60
  };
};

export default Category;