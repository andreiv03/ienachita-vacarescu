import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { RichText } from "@graphcms/rich-text-react-renderer";
import moment from "moment";
import "moment/locale/ro";

import RichTextConverter from "../../utils/rich-text-converter";
import type { PostInterface } from "../../interfaces/posts-interfaces";
import type { CommentInterface } from "../../interfaces/comments-interfaces";

import styles from "../../styles/pages/post.module.scss";
const Card = dynamic(() => import("../../components/card"));
const Comments = dynamic(() => import("../../components/comments"));
const ScrollToTopButton = dynamic(() => import("../../components/scroll-button"));

interface PropsInterface {
  post: PostInterface;
  relatedPosts: PostInterface[];
  comments: CommentInterface[];
};

interface GetStaticPropsInterface {
  params: {
    slug: string;
  };
};

const Post: NextPage<PropsInterface> = ({ post, relatedPosts, comments }) => {
  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        <div className={styles.image}>
          <Image
            src={post.image.url}
            alt={post.title}
            layout="fill"
            priority
          />
        </div>

        <div className={styles.top_section}>
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

          <h1 className={styles.title}>{post.title}</h1>
          <p className={styles.excerpt}>{post.excerpt}</p>

          <div className={styles.author}>
            <div className={styles.photo}>
              <Image
                src={post.author.photo.url}
                alt={post.author.name}
                layout="fill"
              />
            </div>

            <div className={styles.column}>
              <h3>{post.author.name}</h3>
              <h4>{moment(post.createdAt).format("dddd, DD MMMM YYYY, hh:mm A")}</h4>  
            </div>
          </div>
        </div>

        <div className={styles.arrows}>
          <div className={styles.container}>
            <span />
            <span />
            <span />
          </div>
        </div>

        <div className={styles.content}>
          {post.content && (
            <RichText
              content={post.content.raw}
              renderers={{
                a: RichTextConverter.linkElement,
                img: RichTextConverter.imageElement,
                code_block: ({ children }) => <p>{children}</p>
              }}
            />
          )}
        </div>

        <div className={styles.delimitation}>
          <h6>End of article</h6>
          <div className={styles.container}>
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>

      <Comments comments={comments} slug={post.slug} />

      <div className={styles.posts}>
        <h2 className={styles.title}>Related Articles</h2>
        <div className={styles.container}>
          {relatedPosts && relatedPosts.map((post, index) => (
            <Card key={index} post={post} />
          ))}
        </div>
      </div>

      <ScrollToTopButton />
    </div>
  );
}

export const getStaticProps = async ({ params }: GetStaticPropsInterface) => {
  const { default: PostsService } = await import("../../services/posts-service");
  const post = await PostsService.getPost(params.slug);
  const relatedPosts = await PostsService.getRelatedPosts(post.slug, post.categories.map(category => category.slug));
  
  const { default: CommentsService } = await import("../../services/comments-service");
  const comments = await CommentsService.getComments(post.slug);

  return {
    props: {
      post,
      relatedPosts,
      comments
    },
    revalidate: 60
  };
}

export const getStaticPaths = async () => {
  const { default: PostsService } = await import("../../services/posts-service");
  const posts = await PostsService.getAllPosts();

  return {
    paths: posts.map(({ slug }) => ({ params: { slug }})),
    fallback: "blocking"
  };
}

export default Post;