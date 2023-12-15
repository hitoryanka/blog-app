import { useGetUserQuery } from "../../features/posts";
import { IPost } from "../../utils/types";
import styles from "./post.module.css";

export const Post = (props: IPost) => {
  const { title, body, userId } = props;
  // const author = {
  //   id: 0,
  //   name: "unknown",
  //   username: "unknown",
  //   email: "unknown@gmail.com",
  // };

  const { data: author } = useGetUserQuery(userId);

  if (!author) {
    return;
    <h2>loading...</h2>;
  }

  return (
    <article className={styles.post}>
      <header>
        <img
          src={`/users/photos/${author.id}.png`}
          alt="avatar"
        />
        <h2>{title}</h2>
      </header>
      <main>
        <p>{body}</p>
        <footer>
          <small>
            by: {author.name} | {author.username}
          </small>
        </footer>
      </main>
    </article>
  );
};
