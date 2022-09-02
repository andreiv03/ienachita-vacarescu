import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

import { InteractionContext } from "../context/interaction.context";

import styles from "../styles/components/header.module.scss";

const Header: React.FC = () => {
  const { isMenuOpen: [isMenuOpen, setIsMenuOpen] } = useContext(InteractionContext);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" passHref>
          <div className={styles.logo}>
            <Image
              src="/assets/logo-v1.svg"
              alt={`National College "Ienăchiță Văcărescu" Târgoviște`}
              layout="fill"
            />
          </div>
        </Link>

        <Link href="/" passHref>
          <div className={styles.logo}>
            <Image
              src="/assets/logo-v2.svg"
              alt={`National College "Ienăchiță Văcărescu" Târgoviște`}
              layout="fill"
            />
          </div>
        </Link>

        <div className={`${styles.menu_button} ${isMenuOpen ? styles.menu_open : ""}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </header>
  );
}

export default Header;