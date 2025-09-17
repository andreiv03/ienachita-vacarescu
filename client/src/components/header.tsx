"use client";

import Link from "next/link";
import { RiMapPinUserFill } from "react-icons/ri";

import { LayoutContext } from "@/contexts/layout-context";
import { useContextHook } from "@/hooks/use-context-hook";

import Logo from "@/assets/logo";
import styles from "@/styles/components/header.module.scss";

export default function Header() {
  const { state, setIsMenuOpen } = useContextHook(LayoutContext);

  return (
    <header className={styles["header"]} ref={state.headerRef}>
      <Link href="/" passHref>
        <Logo />
      </Link>

      <button onClick={() => setIsMenuOpen(!state.isMenuOpen)}>
        <RiMapPinUserFill />
        <span>FAQ</span>
      </button>
    </header>
  );
}
