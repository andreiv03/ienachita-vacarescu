import styles from "../styles/components/footer.module.scss";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>
        <h4>@ Copyright Colegiul Național &quot;Ienăchiță Văcărescu&quot; Târgoviște. All rights reserved.</h4>
      </div>
    </footer>
  );
}

export default Footer;