import Link from "next/link";
import Image from "next/image";

import styles from "../styles/components/footer.module.scss";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>
        <div className={styles.row}>
          <Link href="/" passHref>
            <div className={styles.logo}>
              <Image
                src="/logo.svg"
                alt={`National College "Ienăchiță Văcărescu"`}
                layout="fill"
              />
            </div>
          </Link>

          <div className={styles.column}>
            <h4>Location</h4>
            <h5>Calea Domnească, Nr. 235</h5>
            <h5>Târgoviște, Dâmbovița</h5>
          </div>

          <div className={styles.column}>
            <h4>Say hello</h4>
            <a href="mailto: secretariat.ienachita@gmail.com">secretariat.ienachita@gmail.com</a>
            <a href="tel: +40245210966">+4024-521-0966</a>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.social_media}>
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer">Facebook</a>
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://www.youtube.com" target="_blank" rel="noreferrer">Youtube</a>
          </div>
          
          <div className={styles.column}>
            <h5>Copyright @ {new Date().getFullYear()} All rights reserved by National College &quot;Ienăchiță Văcărescu&quot;</h5>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;