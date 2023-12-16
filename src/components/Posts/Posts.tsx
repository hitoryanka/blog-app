import { useEffect, useState } from "react";
import styles from "./posts.module.css";
import { IPost } from "../../utils/types";
import { Post } from "./Post/Post";
import { useGetAllPostsQuery } from "../../features/posts";

// TODO add pagination for posts
export const Posts = () => {
  const [posts, setPosts] = useState<IPost[]>([]);

  const { data } = useGetAllPostsQuery();

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
