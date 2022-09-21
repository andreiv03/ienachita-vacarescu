import Image from "next/image";
import Link from "next/link";
import moment from "moment";

import type { Post } from "../services/post.service";
import styles from "../styles/components/post-card.module.scss";

interface Props {
  index: number;
  post: Post;
};

const PostCard: React.FC<Props> = ({ index, post }) => {
  return (
    <Link href={`/post/${post.slug}`}>
      <div className={styles.card}>
        <div className={styles.image}>
          <Image
            alt={post.title}
            layout="fill"
            src={`/assets/thumbnail-v${index % 5 + 1}.jpg`}
          />
        </div>

        <div className={styles.details}>
          <h5>{`${moment(post.createdAt).format("MMMM DD, YYYY")} | ${post.category.name}`}</h5>
          <h2>{post.title.length < 50 ? post.title : `${post.title.slice(0, 50)}...`}</h2>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;