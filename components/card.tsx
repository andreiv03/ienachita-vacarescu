import Link from "next/link";
import Image from "next/image";
import moment from "moment";
import "moment/locale/ro";

import Helpers from "../utils/helpers";
import type { PostInterface } from "../interfaces/posts-interfaces";

import styles from "../styles/components/card.module.scss";

interface PropsInterface {
  post: PostInterface;
};

const Card: React.FC<PropsInterface> = ({ post }) => {
  return (
    <article className={styles.card}>
      <div className={styles.image}>
        <Image
          src={post.image.url}
          alt={post.title}
          layout="fill"
        />
      </div>

      <div className={styles.details}>
        {post.categories && post.categories.length ? (
          <div className={styles.categories}>
            {post.categories.map(category => (
              <div key={category.slug} className={styles.category}>
                <Link href={`/category/${category.slug}`} passHref>
                  <span>{category.name}</span>
                </Link>
              </div>
            ))}
          </div>
        ) : null}

        <h2 className={styles.title}>{post.title}</h2>
        <p className={styles.excerpt}>{Helpers.shortenText(post.excerpt)}</p>

        <div className={styles.row}>
          <h3>{moment(post.createdAt).format("DD MMM YYYY")}</h3>
          <h3>{post.author.name}</h3>
        </div>
      </div>

      <Link href={`/post/${post.slug}`} passHref>
        <span className={styles.overlay} />
      </Link>
    </article>
  );
}

export default Card;