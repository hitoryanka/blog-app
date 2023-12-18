/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import styles from "./posts.module.css";
import { IPost } from "../../utils/types";
import { Post } from "./Post/Post";
import {
  useGetPostsQuery,
  // useGetPostsOfUserQuery,
} from "../../features/posts";

// TODO add pagination for posts
export const Posts = () => {
  const [posts, setPosts] = useState<IPost[]>([]);

  const userId = location.pathname.includes("users")
    ? location.pathname.split("/").at(-1)
    : undefined;

  const { data } = useGetPostsQuery(userId);

  useEffect(() => {
    if (data) {
      setPosts(data);
    }
  }, [data]);
  return (
    <section className={styles.posts}>
      {posts.map((post) => (
        // TODO find author in <Post />
        <Post
          {...post}
          key={post.id}
        />
      ))}
    </section>
  );
};
