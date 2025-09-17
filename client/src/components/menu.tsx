"use client";

import { useEffect, useState } from "react";

import { LayoutContext } from "@/contexts/layout-context";
import { useContextHook } from "@/hooks/use-context-hook";
import { useScrollPosition } from "@/hooks/use-scroll-position";
import { useWindowSize } from "@/hooks/use-window-size";

import Collapsible from "@/components/collapsible";
import styles from "@/styles/components/menu.module.scss";

export default function Menu() {
  const { state, setIsMenuOpen } = useContextHook(LayoutContext);
  const scrollPosition = useScrollPosition();
  const windowSize = useWindowSize();

  const [menuTopPosition, setMenuTopPosition] = useState(0);

  useEffect(() => {
    if (!state.headerRef.current) {
      return;
    }

    setMenuTopPosition(
      state.headerRef.current?.offsetHeight + state.headerRef.current.getBoundingClientRect().top,
    );
  }, [state.headerRef, scrollPosition.y, windowSize.width]);

  return (
    <div
      className={`${styles["menu"]} ${state.isMenuOpen ? styles["open"] : ""}`}
      style={{ top: `${menuTopPosition}px` }}
    >
      <div className={styles["container"]}>
        <div className={styles["content"]}>
          <h3>Frequently asked questions</h3>

          <Collapsible label="Who are we?" styles={styles}>
            <p>
              In our school the keyword is definitely &quot;perspective&quot;, which implicitly
              calls the future! If we want to understand the demands of reality, we could think
              about what Paul Valery said: &quot;today, even the future is not what it was&quot;. We
              do not have to write poetry on this topic, but we can understand that we have to
              prepare differently every year.
            </p>
            <p>
              <strong>National College &quot;Ienăchiță Văcărescu&quot;</strong> is the place where
              students will acquire what was called &quot;higher education&quot; at the beginning of
              the century, a generous concept adapted to the requirements imposed by the reality of
              the past years.
            </p>
          </Collapsible>

          <Collapsible label="Where can we be found?" styles={styles}>
            <p>
              You can find us at{" "}
              <a href="https://goo.gl/maps/NqDdzpPU3HgHwV9RA" rel="noreferrer" target="_blank">
                Calea Domnească 235, Târgoviște, Dâmbovița
              </a>
            </p>
          </Collapsible>

          <Collapsible label="How can you contact us?" styles={styles}>
            <p>
              You can call us at phone number <a href="tel: +40245210966">0245-210-966</a> or
              contact us by email at{" "}
              <a href="mailto: secretariat.ienachita@gmail.com">secretariat.ienachita@gmail.com</a>{" "}
              for any information.
            </p>
          </Collapsible>
        </div>
      </div>

      <div className={styles["backdrop"]} onClick={() => setIsMenuOpen(false)} />
    </div>
  );
}
