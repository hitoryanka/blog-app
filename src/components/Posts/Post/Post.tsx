import { IPost } from "../../../utils/types";
import styles from "./post.module.css";

export const Post = (props: IPost) => {
  const { title, body } = props;
  const author = {
    id: 1,
    name: "John",
    username: "Gunner",
    email: "JohnGunner@gmail.com",
  };

  // import avatar from `../../assets/users/photos/${author.id}.png`;

  return (
    <article className={styles.post}>
      <header>
        <img
          src={`/users/photos/${author.id}.png`}
          alt="avatar"
        />
        <hgroup>
          <h2>{title}</h2>
          <small>
            by: {author.name} | {author.username}
          </small>
        </hgroup>
      </header>
      <p>{body}</p>
    </article>
  );
};
