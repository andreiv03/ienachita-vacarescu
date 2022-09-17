import { useRef, useState } from "react";

interface Props {
  children: React.ReactNode;
  label: string;
  styles: {
    readonly [key: string]: string;
  };
};

const Collapsible: React.FC<Props> = ({ children, label, styles }) => {
  const contentWrapperRef = useRef({} as HTMLDivElement);
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className={styles.collapsible}>
      <button type="button" onClick={() => setIsOpen(!isOpen)}>{label}</button>
      <div className={styles.collapsible_wrapper} ref={contentWrapperRef} style={{ height: isOpen ? `${contentWrapperRef.current.scrollHeight}px` : "0px" }}>
        <div className={styles.collapsible_content}>{children}</div>
      </div>
    </div>
  );
}

export default Collapsible;