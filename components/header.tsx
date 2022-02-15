import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

import useScroll from "../hooks/use-scroll";
import styles from "../styles/components/header.module.scss";

const Header: React.FC = () => {
  const [isHeaderFixed, setIsHeaderFixed] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);

  const { scrollY, scrollVerticalDirection } = useScroll();

  useEffect(() => {
    scrollY > 80 ? setIsHeaderFixed(true) : setIsHeaderFixed(false);
    scrollVerticalDirection === "up" ? setIsHeaderVisible(true) : setIsHeaderVisible(false);
  }, [scrollY, scrollVerticalDirection]);

  return (
    <header className={styles.header}>
      <div className={`${styles.wrapper} ${isHeaderFixed ? styles.fixed : ""} ${isHeaderFixed && isHeaderVisible ? styles.visible : ""}`}>
        <Link href="/" passHref>
          <div className={styles.logo}>
            <Image
              src="/logo-black.svg"
              alt={`National College "Ienăchiță Văcărescu"`}
              layout="fill"
            />
          </div>
        </Link>

        <div className={styles.menu}>
          <span>Menu</span>
          <svg width="20" height="15">
            <rect width="15" height="2" x="5" y="0" />
            <rect width="10" height="2" x="10" y="6.5" />
            <rect width="20" height="2" x="0" y="13" />
          </svg>
        </div>
      </div>
    </header>
  );
}

export default Header;