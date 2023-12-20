/* eslint-disable react-hooks/rules-of-hooks */
import styles from "./posts.module.css";
import { Post } from "./Post/Post";
import { useGetAllUsersQuery, useGetPostsQuery } from "../../features/posts";

// TODO add pagination for posts
export const Posts = () => {
  // TODO use isFetching to grey out posts
  const {
    data: posts,
    isLoading: isPostsLoading,
    isError: postsError,
  } = useGetPostsQuery();
  const {
    data: users,
    isLoading: isUsersLoading,
    isError: usersError,
  } = useGetAllUsersQuery();

  if (isPostsLoading) {
    return <h2>posts are loading...</h2>;
  }

  if (!posts || !users) {
    return <h2>no data</h2>;
  }

  return (
    <section className={styles.posts}>
      {posts.map((post) => (
        <Post
          post={post}
          author={users.find((user) => user.id === post.userId)}
          key={post.id}
        />
      ))}
    </section>
  );
};
