import { useState } from "react";
import moment from "moment";
import "moment/locale/ro";

import Handlers from "../utils/handlers";
import type { CommentInterface, CommentFormDataInterface as FormData } from "../interfaces/comments-interfaces";

import styles from "../styles/components/comments.module.scss";

interface PropsInterface {
  comments: CommentInterface[] | [];
  slug: string;
};

const formDataInitialState: FormData = {
  name: "",
  email: "",
  message: ""
};

const Comments: React.FC<PropsInterface> = ({ comments, slug }) => {
  const [formData, setFormData] = useState<FormData>(formDataInitialState);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFormValidity = () => {
    if (!formData.name || !formData.email || !formData.message) return true;
    if (isLoading || isSubmitted) return true;
    return false;
  }

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsLoading(true);

      const { default: CommentsService } = await import("../services/comments-service");
      await CommentsService.submitComment(formData, slug);

      setFormData(formDataInitialState);
      setIsLoading(false);
      setIsSubmitted(true);
      const submitTimeout = setTimeout(() => setIsSubmitted(false), 3000);
      return () => clearTimeout(submitTimeout);
    } catch (error: any) {
      return alert(error.response.data.message);
    }
  }

  return (
    <div className={styles.comments}>
      <h2 className={styles.title}>Comments ({comments.length})</h2>
      <form onSubmit={handleFormSubmit} autoComplete="off">
        <div className={styles.row}>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={event => Handlers.handleFormDataChange(event.target.name, event.target.value, setFormData)}
          />

          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={event => Handlers.handleFormDataChange(event.target.name, event.target.value, setFormData)}
          />
        </div>

        <textarea
          id="message"
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={event => Handlers.handleFormDataChange(event.target.name, event.target.value, setFormData)}
        />

        <button type="submit" disabled={handleFormValidity()} className={`${isLoading ? styles.loading : ""} ${isSubmitted ? styles.submit : ""}`}>
          <span>Submit comment</span>
          <span>Comment submitted for review!</span>
        </button>
      </form>

      {comments.length ? (
        <div className={styles.container}>
          {comments.map((comment, index) => (
            <div key={index} className={styles.comment}>
              <h3>{moment(comment.createdAt).format("dddd, DD MMMM YYYY, hh:mm A")}</h3>
              <h2>{comment.name}</h2>
              <p>{comment.message}</p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default Comments;