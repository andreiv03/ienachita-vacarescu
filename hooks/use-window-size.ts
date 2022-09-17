import { useEffect, useState } from "react";

export const useWindowSize = () => {
  if (typeof window === "undefined")
    return { height: 0, width: 0 };

  const [windowSize, setWindowSize] = useState({
    height: window.innerHeight,
    width: window.innerWidth
  });

  useEffect(() => {
    const handleResizeEvent = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }

    window.addEventListener("resize", handleResizeEvent);
    return () => window.removeEventListener("resize", handleResizeEvent);
  }, []);

  return windowSize;
}