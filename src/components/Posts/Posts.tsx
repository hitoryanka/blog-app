/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import styles from "./posts.module.css";
import { IPost } from "../../utils/types";
import { Post } from "./Post/Post";
import {
  useGetAllPostsQuery,
  useGetPostsOfUserQuery,
} from "../../features/posts";

interface PostsProps {
  userId?: number;
}

// TODO add pagination for posts
export const Posts = ({ userId }: PostsProps) => {
  const [posts, setPosts] = useState<IPost[]>([]);

  // EsLint disabled for this file due to conditional hook usage
  const { data } = userId
    ? useGetPostsOfUserQuery(userId)
    : useGetAllPostsQuery();

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
