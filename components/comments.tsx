import { useState } from "react";
import moment from "moment";

import handlers from "../utils/handlers";
import type { CommentInterface, CommentFormDataInterface as FormData } from "../interfaces/comments-interfaces";

import styles from "../styles/components/comments.module.scss";

interface PropsInterface {
  comments: CommentInterface[] | [];
  slug: string;
};

const formDataInitialState: FormData = {
  email: "",
  message: "",
  name: ""
};

const Comments: React.FC<PropsInterface> = ({ comments, slug }) => {
  const [formData, setFormData] = useState<FormData>(formDataInitialState);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const handleFormValidity = () => {
    if (!formData.email || !formData.message || !formData.name) return true;
    if (isLoading || isSubmitted) return true;
    return false;
  }

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsLoading(true);

      const { default: commentsService } = await import("../services/comments-service");
      await commentsService.submitComment(formData, slug);

      setFormData(formDataInitialState);
      setIsLoading(false);
      setIsSubmitted(true);

      const submitTimeout = setTimeout(() => setIsSubmitted(false), 3000);
      return () => clearTimeout(submitTimeout);
    } catch (error: any) {
      return alert(error);
    }
  }

  return (
    <div className={styles.comments}>
      <h2 className={styles.title}>Leave a comment</h2>
      <form onSubmit={handleFormSubmit} autoComplete="off">
        <div className={styles.row}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={event => handlers.handleFormDataChange(event.target.name, event.target.value, setFormData)}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={event => handlers.handleFormDataChange(event.target.name, event.target.value, setFormData)}
          />
        </div>

        <textarea
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={event => handlers.handleFormDataChange(event.target.name, event.target.value, setFormData)}
        />

        <button type="submit" disabled={handleFormValidity()} className={`${isLoading ? styles.loading : ""} ${isSubmitted ? styles.submit : ""}`}>
          <span>Submit comment</span>
          <span>Submitted for review!</span>
        </button>
        
        <h3 className={comments.length ? styles.active : ""} onClick={() => comments.length && setIsActive(true)}>
          {comments.length ? `View comments (${comments.length})` : "There are no comments"}
        </h3>
      </form>

      {comments.length ? (
        <div className={`${styles.container} ${isActive ? styles.active : ""}`}>
          {comments.map((comment, index) => (
            <div key={index} className={styles.comment}>
              <h5>Posted on {moment(comment.createdAt).format("MMMM DD, YYYY")}</h5>
              <h3>{comment.name}</h3>
              <p>{comment.message}</p>
            </div>
          ))}

        </div>
      ) : null}

      {comments.length ? <div className={`${styles.overlay} ${isActive ? styles.active : ""}`} onClick={() => setIsActive(false)} /> : null}
    </div>
  );
}

export default Comments;