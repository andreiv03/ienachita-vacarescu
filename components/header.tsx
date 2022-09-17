import dynamic from "next/dynamic";
import Link from "next/link";
import { useContext } from "react";
import { RiMapPinUserFill } from "react-icons/ri";

import { Context } from "../context";

import styles from "../styles/components/header.module.scss";
const Logo = dynamic(() => import("../assets/logo-v1.svg"));

const Header: React.FC = () => {
  const { headerRef, isMenuOpen: [isMenuOpen, setIsMenuOpen] } = useContext(Context);

  return (
    <header className={styles.header} ref={headerRef}>
      <Link href="/" passHref><Logo /></Link>
      <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <RiMapPinUserFill />
        <span>FAQ</span>
      </button>
    </header>
  );
}

export default Header;