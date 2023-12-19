/* eslint-disable react-hooks/rules-of-hooks */
import { useContext } from "react";
import styles from "./posts.module.css";
import { Post } from "./Post/Post";
import { DataContext } from "../../App";

// TODO add pagination for posts
export const Posts = () => {
  const {
    posts: [posts],
  } = useContext(DataContext);

  return (
    <section className={styles.posts}>
      {posts.map((post) => (
        <Post
          {...post}
          key={post.id}
        />
      ))}
    </section>
  );
};
