import dynamic from "next/dynamic";
import Link from "next/link";
import { useContext } from "react";

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

      <button onClick={() => setIsMenuOpen(!isMenuOpen)}>Contact</button>
    </header>
  );
}

export default Header;