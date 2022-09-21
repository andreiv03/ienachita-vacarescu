import Image from "next/image";
import sanityImageURLBuilder from "@sanity/image-url";

import { sanityClient } from "./sanity";

const builder = sanityImageURLBuilder(sanityClient);
const generateURL = (source: any) => builder.image(source).url();

export const getPortableComponents = (styles: {
  readonly [key: string]: string;
}) => ({
  types: {
    image: ({ value }: any) => (
      <div className={styles.image}>
        <Image
          alt={`National College "Ienăchiță Văcărescu"`}
          layout="fill"
          src={generateURL(value)}
        />
      </div>
    )
  }
});