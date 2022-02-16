import Link from "next/link";
import Image from "next/image";
import type { DefaultElementProps, LinkRendererProps, ImageProps } from "@graphcms/rich-text-types";

import styles from "../styles/pages/post.module.scss";

class RichTextConverter {
  headingElement({ children }: DefaultElementProps) {
    return <h2>{children}</h2>;
  }

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
      <Link href={href} passHref>
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

  codeBlockElement({ children }: DefaultElementProps) {
    return <p>{children}</p>;
  }
};

const richTextConverter = new RichTextConverter();
export default richTextConverter;