import Link from "next/link";
import { useEffect, useState } from "react";
import { RiSearchEyeFill, RiMenuFill } from "react-icons/ri";

import useScroll from "../hooks/use-scroll";
import styles from "../styles/components/header.module.scss";

const Header: React.FC = () => {
  const [isHeaderFixed, setIsHeaderFixed] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);

  const { scrollY, scrollVerticalDirection } = useScroll();

  useEffect(() => {
    if (scrollY > 80) setIsHeaderFixed(true);
    else setIsHeaderFixed(false);

    if (scrollVerticalDirection === "up") setIsHeaderVisible(true);
    else setIsHeaderVisible(false);
  }, [scrollY, scrollVerticalDirection]);

  return (
    <header className={styles.header}>
      <div className={`${styles.wrapper} ${isHeaderFixed ? styles.fixed : ""} ${isHeaderFixed && isHeaderVisible ? styles.visible : ""}`}>
        <div className={styles.content}>
          <div className={styles.logo}>
            <Link href="/" passHref>
              <span>Ienachita</span>
            </Link>
          </div>

          <div className={styles.links}>
            
          </div>

          <div className={styles.buttons}>
            <Link href="/" passHref>
              <button type="button">
                <span>Contact us</span>
              </button>
            </Link>

            <button type="button">
              <span>Search</span>
              <RiSearchEyeFill />
            </button>
          </div>

          <div className={styles.menu}>
            <RiMenuFill />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;