import dynamic from "next/dynamic";
import Link from "next/link";
import { useContext } from "react";
import { RiMapPinUserFill } from "react-icons/ri";

import { Context } from "../context";

import styles from "../styles/components/header.module.scss";
const Logo = dynamic(() => import("../assets/logo-v1.svg"));

const Header: React.FC = () => {
  const { isMenuOpen: [isMenuOpen, setIsMenuOpen], headerRef } = useContext(Context);

  return (
    <header className={styles.header} ref={headerRef}>
      <Link href="/" passHref>
        <div className={styles.logo}>
          <Logo />
        </div>
      </Link>

      <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <RiMapPinUserFill />
        <span>Contact</span>
      </button>
    </header>
  );
}

export default Header;