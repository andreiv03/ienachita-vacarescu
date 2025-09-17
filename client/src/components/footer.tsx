import styles from "@/styles/components/footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles["footer"]}>
      <h6>
        Copyright © {new Date().getFullYear()} National College &quot;Ienăchiță Văcărescu&quot;. All
        rights reserved.
      </h6>
    </footer>
  );
}
