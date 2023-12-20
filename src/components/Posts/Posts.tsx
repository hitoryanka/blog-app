/* eslint-disable react-hooks/rules-of-hooks */
import styles from "./posts.module.css";
import { Post } from "./Post/Post";
import { useGetPostsQuery, useGetUsersQuery } from "../../features/posts";
import { useSearchParams } from "react-router-dom";
import { useContext } from "react";
import { SearchContext } from "../../App";

// TODO add pagination for posts
export const Posts = () => {
  // TODO use isFetching to grey out posts

  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");

  const [searchValue] = useContext(SearchContext);

  const {
    data: posts,
    isLoading: isPostsLoading,
    // isError: postsError,
  } = useGetPostsQuery([userId, searchValue]);
  const {
    data: users,
    // isLoading: isUsersLoading,
    // isError: usersError,
  } = useGetUsersQuery();

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
