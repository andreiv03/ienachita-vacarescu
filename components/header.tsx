import dynamic from "next/dynamic";
import Link from "next/link";

import styles from "../styles/components/header.module.scss";
const Logo = dynamic(() => import("../assets/logo.svg"));

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <Link href="/" passHref>
        <div className={styles.logo}>
          <Logo />
        </div>
      </Link>

      <button>Contact</button>
    </header>
  );
}

export default Header;