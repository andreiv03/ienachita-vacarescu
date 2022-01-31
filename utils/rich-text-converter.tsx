import Link from "next/link";
import Image from "next/image";
import type { LinkRendererProps, ImageProps } from "@graphcms/rich-text-types";

import styles from "../styles/pages/post.module.scss";

class RichTextConverterClass {
  linkElement({ children, openInNewTab, href, rel, ...rest }: LinkRendererProps) {
    if (!href) return <></>;
    
    if (href.match(/^https?:\/\/|^\/\//i)) {
      return (
        <a
          href={href}
          target={openInNewTab ? "_blank" : "_self"}
          rel={rel || "noopener noreferrer"}
          {...rest}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href}>
        <a {...rest}>{children}</a>
      </Link>
    );
  }

  imageElement({ src, altText }: Partial<ImageProps>) {
    if (!src) return <></>;
    
    return (
      <div className={styles.image}>
        <Image
          src={src}
          alt={altText}
          layout="fill"
        />
      </div>
    );
  }
}

const RichTextConverter = new RichTextConverterClass();
export default RichTextConverter;