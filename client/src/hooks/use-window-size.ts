import { useSyncExternalStore } from "react";

type WindowSize = { width: number; height: number };

const SERVER_SNAPSHOT: Readonly<WindowSize> = { width: 0, height: 0 };

let snapshot: WindowSize =
  typeof window === "undefined"
    ? SERVER_SNAPSHOT
    : { width: window.innerWidth, height: window.innerHeight };

export const useWindowSize = () => {
  const getSnapshot = () => snapshot;
  const getServerSnapshot = () => SERVER_SNAPSHOT;

  const subscribe = (notify: () => void) => {
    let raf = 0;

    if (typeof window === "undefined") {
      return () => {};
    }

    const onChange = () => {
      if (raf) {
        return;
      }

      raf = requestAnimationFrame(() => {
        const next = { width: window.innerWidth, height: window.innerHeight };
        raf = 0;

        if (next.width !== snapshot.width || next.height !== snapshot.height) {
          snapshot = next;
          notify();
        }
      });
    };

    window.addEventListener("resize", onChange, { passive: true });
    window.addEventListener("orientationchange", onChange, { passive: true });

    return () => {
      window.removeEventListener("resize", onChange);
      window.removeEventListener("orientationchange", onChange);

      if (raf) {
        cancelAnimationFrame(raf);
      }
    };
  };

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};
