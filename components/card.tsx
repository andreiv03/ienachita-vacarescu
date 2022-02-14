import Link from "next/link";
import Image from "next/image";
import moment from "moment";

import helpers from "../utils/helpers";
import type { PostInterface } from "../interfaces/posts-interfaces";

import styles from "../styles/components/card.module.scss";

interface PropsInterface {
  post: PostInterface;
};

const Card: React.FC<PropsInterface> = ({ post }) => {
  return (
    <Link href={`/post/${post.slug}`} passHref>
      <div className={styles.card}>
        <div className={styles.image}>
          <Image
            src={post.image.url}
            alt={post.title}
            layout="fill"
          />
        </div>

        <div className={styles.details}>
          <h3>{helpers.shortenText(post.title, 50)}</h3>
          <p>{helpers.shortenText(post.excerpt, 75)}</p>
          <h5>Posted on {moment(post.createdAt).format("MMMM DD, YYYY")}</h5>
        </div>
      </div>
    </Link>
  );
}

export default Card;