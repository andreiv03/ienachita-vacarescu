"use client";

import Image from "next/image";
import createImageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

import { sanityClient } from "@/config/sanity";

type Styles = { readonly [key: string]: string };

const imageUrlBuilder = createImageUrlBuilder(sanityClient);

function getPortableTextComponents(styles: Styles) {
  return {
    types: {
      image: ({ value }: { value: SanityImageSource & { alt?: string } }) => {
        if (!value || !("asset" in value)) {
          return null;
        }

        return (
          <div className={styles["image"]}>
            <Image
              alt={value?.alt ?? `National College "Ienăchiță Văcărescu"`}
              decoding="async"
              fill
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 800px"
              src={imageUrlBuilder.image(value).auto("format").fit("max").quality(80).url()}
            />
          </div>
        );
      },
    },
  } as const;
}

export default function PortableTextClient({
  styles,
  value,
}: {
  styles: Styles;
  value: PortableTextBlock[];
}) {
  return <PortableText components={getPortableTextComponents(styles)} value={value} />;
}
