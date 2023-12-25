import { useGetUsersPostCntQuery } from "../../../features/posts";
import { IUser } from "../../../utils/types";
import styles from "./user.module.css";

interface UserProps {
  user: IUser;
}

export const User = ({ user }: UserProps) => {
  const { id, username, name, email, phone, website } = user;

  const { data: postsWritten } = useGetUsersPostCntQuery(id);

  return (
    <a
      href={`/?userId=${id}`}
      className={styles["user-wrapper"]}
    >
      <article className={styles.user}>
        <header>
          <img
            src={`/users/photos/${id}.png`}
            alt="avatar"
          />
          <h2>
            {username} | {name}
          </h2>
        </header>
        <main>posts written: {postsWritten ?? "loading..."}</main>
        <footer>
          Contact info:
          <ul>
            <li>Email: {email}</li>
            <li>Phone: {phone}</li>
            <li>Website: {website}</li>
          </ul>
        </footer>
      </article>
    </a>
  );
};
