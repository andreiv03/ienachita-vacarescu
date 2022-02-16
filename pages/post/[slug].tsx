import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import { RichText } from "@graphcms/rich-text-react-renderer";
import moment from "moment";

import richTextRenderer from "../../utils/rich-text-renderer";
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
        <h5>Posted on {moment(post.createdAt).format("MMMM DD, YYYY")}</h5>
        <h1>{post.title}</h1>
        <p>{post.excerpt}</p>
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
              h1: richTextRenderer.headingElement,
              h2: richTextRenderer.headingElement,
              h3: richTextRenderer.headingElement,
              h4: richTextRenderer.headingElement,
              h5: richTextRenderer.headingElement,
              h6: richTextRenderer.headingElement,
              a: richTextRenderer.linkElement,
              img: richTextRenderer.imageElement,
              code_block: richTextRenderer.codeBlockElement
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
          <p>Stay up to date with latest news and articles from National College &quot;Ienăchiță Văcărescu&quot;</p>
          
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