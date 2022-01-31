import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { RiCheckDoubleLine } from "react-icons/ri";
import { RichText } from "@graphcms/rich-text-react-renderer";
import { motion, AnimatePresence } from "framer-motion";
import moment from "moment";
import "moment/locale/ro";

import RichTextConverter from "../../utils/rich-text-converter";
import type { PostInterface } from "../../interfaces/posts-interfaces";
import type { CommentFormDataInterface as FormData } from "../../interfaces/comments-interfaces";

import styles from "../../styles/pages/post.module.scss";
const Card = dynamic(() => import("../../components/card"));

interface PropsInterface {
  post: PostInterface;
  relatedPosts: PostInterface[];
};

interface GetStaticPropsInterface {
  params: {
    slug: string;
  };
};

const formVariants = {
  initial: {
    opacity: 0,
    y: "-100%"
  },
  animate: {
    opacity: 1,
    y: "0%",
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    y: "-100%",
    transtion: {
      duration: 0.4,
      ease: "easeIn"
    }
  }
};

const formDataInitialState: FormData = {
  name: "",
  email: "",
  message: ""
};

const Post: NextPage<PropsInterface> = ({ post, relatedPosts }) => {
  const [formData, setFormData] = useState<FormData>(formDataInitialState);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const { default: CommentsService } = await import("../../services/comments-service");
      await CommentsService.submitComment(formData, post.slug);
      setFormData(formDataInitialState);
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (error: any) {
      return alert(error.response.data.message);
    }
  }

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
                  <Link href={`/category/${category.slug}`}>
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
              <h4>{moment(post.createdAt).format("D MMMM YYYY")}</h4>  
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

      <div className={styles.comments}>
        <h2 className={styles.title}>Comments</h2>
        <form onSubmit={handleFormSubmit} autoComplete="off">
          <div className={styles.row}>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={async event => {
                const { name, value } = event.target;
                const { default: Handlers } = await import("../../utils/handlers");
                Handlers.handleFormDataChange(name, value, setFormData);
              }}
            />

            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={async event => {
                const { name, value } = event.target;
                const { default: Handlers } = await import("../../utils/handlers");
                Handlers.handleFormDataChange(name, value, setFormData);
              }}
            />
          </div>

          <textarea
            id="message"
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={async event => {
              const { name, value } = event.target;
              const { default: Handlers } = await import("../../utils/handlers");
              Handlers.handleFormDataChange(name, value, setFormData);
            }}
          />

          <button type="submit" disabled={!formData.name || !formData.email || !formData.message}>Submit comment</button>

          <AnimatePresence>
            {isSubmitted && (
              <motion.div className={styles.overlay} initial="initial" animate="animate" exit="exit" variants={formVariants}>
                <RiCheckDoubleLine />
                <h3>Comment submitted for review!</h3>
              </motion.div>
            )}
          </AnimatePresence>
        </form>

        <div className={styles.container}>

        </div>
      </div>

      <div className={styles.posts}>
        <h2 className={styles.title}>Related Articles</h2>
        <div className={styles.container}>
          {relatedPosts && relatedPosts.map((post, index) => (
            <Card key={index} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}

export const getStaticProps = async ({ params }: GetStaticPropsInterface) => {
  const { default: PostsService } = await import("../../services/posts-service");
  const post = await PostsService.getPost(params.slug);
  const relatedPosts = await PostsService.getRelatedPosts(post.slug, post.categories.map(category => category.slug));

  return {
    props: { post, relatedPosts },
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