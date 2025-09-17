import { useSyncExternalStore } from "react";

type ScrollPosition = { x: number; y: number };

const SERVER_SNAPSHOT: Readonly<ScrollPosition> = { x: 0, y: 0 };

let snapshot: ScrollPosition =
  typeof window === "undefined" ? SERVER_SNAPSHOT : { x: window.scrollX, y: window.scrollY };

export const useScrollPosition = () => {
  const getSnapshot = () => snapshot;
  const getServerSnapshot = () => SERVER_SNAPSHOT;

  const subscribe = (notify: () => void) => {
    let raf = 0;

    if (typeof window === "undefined") {
      return () => {};
    }

    const onScroll = () => {
      if (raf) {
        return;
      }

      raf = requestAnimationFrame(() => {
        const next = { x: window.scrollX, y: window.scrollY };
        raf = 0;

        if (next.x !== snapshot.x || next.y !== snapshot.y) {
          snapshot = next;
          notify();
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);

      if (raf) {
        cancelAnimationFrame(raf);
      }
    };
  };

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};
