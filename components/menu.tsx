import { useContext, useEffect, useState } from "react";

import { Context } from "../context";
import { useScroll } from "../hooks/use-scroll";

import styles from "../styles/components/menu.module.scss";

const Menu: React.FC = () => {
  const { isMenuOpen: [isMenuOpen, setIsMenuOpen], headerRef } = useContext(Context);
  const [menuTopPosition, setMenuTopPosition] = useState(0);
  const scrollPositions = useScroll();

  useEffect(() => {
    setMenuTopPosition(headerRef.current.offsetHeight + headerRef.current.getBoundingClientRect().top);
  }, [headerRef, scrollPositions.y]);

  return (
    <div className={`${styles.menu} ${isMenuOpen ? styles.active : ""}`} style={{ top: `${menuTopPosition}px` }}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.column}>
            <h4>Location</h4>
            <h5>Calea Domnească, Nr. 235</h5>
            <h5>Târgoviște, Dâmbovița</h5>
          </div>

          <div className={styles.column}>
            <h4>Say hello</h4>
            <a href="mailto: secretariat.ienachita@gmail.com">secretariat.ienachita@gmail.com</a>
            <a href="tel: +40245210966">+4024-521-0966</a>
          </div>
        </div>
      </div>

      <div className={styles.overlay} onClick={() => setIsMenuOpen(false)} />
    </div>
  );
}

export default Menu;