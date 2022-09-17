import dynamic from "next/dynamic";
import { useContext, useEffect, useState } from "react";

import { Context } from "../context";
import { useScroll } from "../hooks/use-scroll";
import { useWindowSize } from "../hooks/use-window-size";

import styles from "../styles/components/menu.module.scss";
const Collapsible = dynamic(() => import("./collapsible"));

const Menu: React.FC = () => {
  const { headerRef, isMenuOpen: [isMenuOpen, setIsMenuOpen] } = useContext(Context);
  const [menuTopPosition, setMenuTopPosition] = useState(0);

  const scroll = useScroll();
  const windowSize = useWindowSize();

  useEffect(() => {
    setMenuTopPosition(headerRef.current.offsetHeight + headerRef.current.getBoundingClientRect().top);
  }, [headerRef, scroll.y, windowSize.width]);

  return (
    <div className={`${styles.menu} ${isMenuOpen ? styles.active : ""}`} style={{ top: `${menuTopPosition}px` }}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h3>Frequently asked questions</h3>

          <Collapsible label="Who are we?" styles={styles}>
            <p>In our school the keyword is definitely <q>perspective</q>, which implicitly calls the future! If we want to understand the demands of reality, we could think about what Paul Valery said: <q>today, even the future is not what it was</q>. We do not have to write poetry on this topic, but we can understand that we have to prepare differently every year.</p>
            <p><strong>National College <q>Ienăchiță Văcărescu</q></strong> is the place where students will acquire what was called <q>higher education</q> at the beginning of the century, a generous concept adapted to the requirements imposed by the reality of the past years.</p>
          </Collapsible>

          <Collapsible label="Where can we be found?" styles={styles}>
            <p>You can find us at <a href="https://goo.gl/maps/NqDdzpPU3HgHwV9RA" rel="noreferrer" target="_blank">Calea Domnească 235, Târgoviște, Dâmbovița</a></p>
          </Collapsible>

          <Collapsible label="How can you contact us?" styles={styles}>
            <p>You can call us at phone number <a href="tel: +40245210966">0245-210-966</a> or contact us by email at <a href="mailto: secretariat.ienachita@gmail.com">secretariat.ienachita@gmail.com</a> for any information.</p>
          </Collapsible>
        </div>
      </div>

      <div className={styles.overlay} onClick={() => setIsMenuOpen(false)} />
    </div>
  );
}

export default Menu;