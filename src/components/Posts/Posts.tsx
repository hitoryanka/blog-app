/* eslint-disable react-hooks/rules-of-hooks */
import styles from "./posts.module.css";
import { Post } from "./Post/Post";
import { useGetPostsQuery, useGetUsersQuery } from "../../features/posts";
import { useLocation, useSearchParams } from "react-router-dom";
import { useContext } from "react";
import { SearchContext } from "../../App";
import { useSelector } from "react-redux";
import { IAuthUser } from "../../utils/types";
import { IState } from "../../store";

// TODO add pagination for posts
export const Posts = () => {
  // TODO use isFetching to grey out posts

  const [searchParams] = useSearchParams();
  const location = useLocation();
  const currentUser = useSelector<IState, IAuthUser | null>(
    (state) => state.users.currentUser
  );

  const onfavorite = location.pathname.includes("favorites");
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

  const postsToRender = onfavorite
    ? posts.filter(({ id }) => currentUser?.favorites.includes(id))
    : posts;

  return (
    <section className={styles.posts}>
      {postsToRender.map((post) => (
        <Post
          post={post}
          author={users.find((user) => user.id === post.userId)}
          key={post.id}
        />
      ))}
    </section>
  );
};
