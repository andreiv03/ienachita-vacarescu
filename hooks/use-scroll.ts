import { useEffect, useState } from "react";

export const useScroll = () => {
  if (typeof window === "undefined")
    return { x: 0, y: 0 };

  const [scrollPositions, setScrollPositions] = useState({
    x: document.body.getBoundingClientRect().left,
    y: document.body.getBoundingClientRect().top
  });

  useEffect(() => {
    const handleScrollEvent = () => {
      setScrollPositions({
        x: document.body.getBoundingClientRect().left,
        y: -document.body.getBoundingClientRect().top
      });
    }

    window.addEventListener("scroll", handleScrollEvent);
    return () => window.removeEventListener("scroll", handleScrollEvent);
  }, []);

  return scrollPositions;
}