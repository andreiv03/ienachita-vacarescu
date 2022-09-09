import styles from "../styles/components/footer.module.scss";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <h6>Copyright © {new Date().getFullYear()} National College "Ienachita Vacarescu". All rights reserved.</h6>
    </footer>
  );
}

export default Footer;