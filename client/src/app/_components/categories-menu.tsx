"use client";

import { useState } from "react";
import Link from "next/link";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";

import type { Category } from "@/types/category";

import styles from "@/styles/pages/home.module.scss";

interface Props {
  categories: Category[];
  activeSlug?: string;
}

export default function CategoriesMenu({ categories, activeSlug }: Props) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className={styles["categories"]}>
      <h3 className={!activeSlug ? styles["active"] : ""}>
        <Link href="/">News</Link>
      </h3>

      {categories.map((category) => (
        <h3 className={category.slug === activeSlug ? styles["active"] : ""} key={category.slug}>
          <Link href={`/category/${category.slug}`}>{category.name}</Link>
        </h3>
      ))}

      <h3 onClick={() => setIsDropdownOpen((prev) => !prev)}>
        Categories {isDropdownOpen ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
      </h3>

      <div className={`${styles["dropdown"]} ${isDropdownOpen ? styles["open"] : ""}`}>
        <h3>
          <Link href="/">News</Link>
        </h3>

        {categories.map((category) => (
          <h3 key={category.slug}>
            <Link href={`/category/${category.slug}`}>{category.name}</Link>
          </h3>
        ))}
      </div>
    </div>
  );
}
