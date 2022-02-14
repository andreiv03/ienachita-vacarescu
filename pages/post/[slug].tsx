import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import { RichText } from "@graphcms/rich-text-react-renderer";
import moment from "moment";

import richTextConverter from "../../utils/rich-text-converter";
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
      <div className={styles.top_section}>
        <h1>{post.title}</h1>
        <p>{post.excerpt}</p>

        <div className={styles.informations}>
          <div className={styles.photo}>
            <Image
              src={post.author.photo.url}
              alt={post.author.name}
              layout="fill"
            />
          </div>

          <div className={styles.text}>
            <h3>Written by <span>{post.author.name}</span></h3>
            <h4>Posted on {moment(post.createdAt).format("dddd, MMMM DD, YYYY")}</h4>
          </div>
        </div>
      </div>

      <div className={styles.image}>
        <Image
          src={post.image.url}
          alt={post.title}
          layout="fill"
          priority
        />
      </div>

      <article className={styles.article}>
        <div className={styles.content}>
          <RichText
            content={post.content.raw}
            renderers={{
              h1: richTextConverter.headingElement,
              h2: richTextConverter.headingElement,
              h3: richTextConverter.headingElement,
              h4: richTextConverter.headingElement,
              h5: richTextConverter.headingElement,
              h6: richTextConverter.headingElement,
              a: richTextConverter.linkElement,
              img: richTextConverter.imageElement,
              code_block: richTextConverter.codeBlockElement
            }}
          />
        </div>

        <div className={styles.end}>
          <h6>Thanks for reading!</h6>
          <div className={styles.container}>
            <span />
            <span />
            <span />
          </div>
        </div>
      </article>

      <Comments comments={comments} slug={post.slug} />

      {relatedPosts.length ? (
        <div className={styles.related_posts}>
          <h2>Related articles</h2>
          <div className={styles.container}>
            {relatedPosts.map((post, index) => <Card key={index} post={post} />)}
          </div>
        </div>
      ) : null}

      <ScrollToTopButton />
    </div>
  );
}

export const getStaticPaths = async () => {
  const { default: postsService } = await import("../../services/posts-service");
  const posts = await postsService.getAllPosts();

  return {
    paths: posts.map(({ slug }) => ({ params: { slug } })),
    fallback: "blocking"
  };
}

export const getStaticProps = async ({ params }: GetStaticPropsInterface) => {
  const { default: postsService } = await import("../../services/posts-service");
  const post = await postsService.getPost(params.slug);
  const relatedPosts = await postsService.getRelatedPosts(post.slug, post.category.slug);
  
  const { default: commentsService } = await import("../../services/comments-service");
  const comments = await commentsService.getComments(post.slug);

  return {
    props: {
      post,
      relatedPosts,
      comments
    },
    revalidate: 60
  };
}

export default Post;