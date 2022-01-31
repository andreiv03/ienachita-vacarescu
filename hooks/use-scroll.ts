import { useState, useEffect, useCallback } from "react";

interface HookStateInterface {
  scrollX: number;
  scrollY: number;
  scrollHorizontalDirection: string;
  scrollVerticalDirection: string;
};

const useScroll = () => {
  if (typeof window === "undefined") {
    return {
      scrollX: 0,
      scrollY: 0,
      scrollHorizontalDirection: "",
      scrollVerticalDirection: ""
    };
  }

  const [state, setState] = useState<HookStateInterface>(() => {
    const bodyOffset = document.body.getBoundingClientRect();

    return {
      scrollX: bodyOffset.left,
      scrollY: bodyOffset.top,
      scrollHorizontalDirection: "",
      scrollVerticalDirection: ""
    };
  });

  const handleScrollEvent = useCallback(() => {
    setState(prevState => {
      const bodyOffset = document.body.getBoundingClientRect();

      return {
        scrollX: bodyOffset.left,
        scrollY: -bodyOffset.top,
        scrollHorizontalDirection: prevState.scrollX > bodyOffset.left ? "right" : "left",
        scrollVerticalDirection: prevState.scrollY > -bodyOffset.top ? "up" : "down"
      };
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScrollEvent);
    return () => window.removeEventListener("scroll", handleScrollEvent);
  }, [handleScrollEvent]);

  return {
    scrollX: state.scrollX,
    scrollY: state.scrollY,
    scrollHorizontalDirection: state.scrollHorizontalDirection,
    scrollVerticalDirection: state.scrollVerticalDirection
  };
}

export default useScroll;