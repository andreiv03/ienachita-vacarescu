"use client";

import { useRef, useState } from "react";

interface Props {
  children: React.ReactNode;
  label: string;
  styles: {
    readonly [key: string]: string;
  };
}

export default function Collapsible({ children, label, styles }: Props) {
  const containerRef = useRef({} as HTMLDivElement);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles["collapsible"]}>
      <button onClick={() => setIsOpen(!isOpen)}>{label}</button>
      <div
        className={styles["collapsible_container"]}
        ref={containerRef}
        style={{
          height: isOpen ? `${containerRef.current.scrollHeight}px` : "0px",
        }}
      >
        <div className={styles["collapsible_content"]}>{children}</div>
      </div>
    </div>
  );
}
