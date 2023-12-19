/* eslint-disable react-hooks/rules-of-hooks */
import { useContext } from "react";
import styles from "./posts.module.css";
import { Post } from "./Post/Post";
import {
  useGetAllUsersQuery,
  useGetPostsQuery,
  // useGetPostsOfUserQuery,
} from "../../features/posts";
import { DataContext } from "../../App";

// TODO add pagination for posts
export const Posts = () => {
  // const [posts, setPosts] = useState<IPost[]>([]);

  const data = useContext(DataContext);

  const userId = location.pathname.includes("users")
    ? location.pathname.split("/").at(-1)
    : undefined;

  const { data: postsData, isLoading: isPostsLoading } =
    useGetPostsQuery(userId);
  const { data: usersData } = useGetAllUsersQuery();

  if (postsData) {
    data.posts = postsData;
  }

  if (usersData) {
    data.users = usersData;
  }

  return (
    <section className={styles.posts}>
      {!isPostsLoading &&
        data.posts.map((post) => (
          <Post
            {...post}
            key={post.id}
          />
        ))}
    </section>
  );
};
