import { RiArrowUpSLine } from "react-icons/ri";

import useScroll from "../hooks/use-scroll";
import styles from "../styles/components/scroll-button.module.scss";

const ScrollToTopButton: React.FC = () => {
  const { scrollY } = useScroll();

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  return (
    <div className={`${styles.button} ${scrollY > 500 ? styles.active : ""}`} onClick={handleClick}>
      <RiArrowUpSLine />
    </div>
  );
}

export default ScrollToTopButton;