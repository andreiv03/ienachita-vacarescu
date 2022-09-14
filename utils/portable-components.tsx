import Image from "next/image";
import sanityImageURLBuilder from "@sanity/image-url";

import { sanityClient } from "./sanity";
import styles from "../styles/pages/post.module.scss";

const builder = sanityImageURLBuilder(sanityClient);
const generateURL = (source: any) => builder.image(source).url(); 

export const portableComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref)
        return null;

      return (
        <div className={styles.image}>
          <Image
            src={generateURL(value)}
            alt={value.alt || ""}
            layout="fill"
          />
        </div>
      );
    }
  }
};