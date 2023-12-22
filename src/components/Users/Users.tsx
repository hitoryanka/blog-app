import { useContext } from "react";
import { useGetUsersQuery } from "../../features/posts";
import { User } from "./User/User";
import styles from "./users.module.css";
import { SearchContext } from "../../App";

export const Users = () => {
  const [searchValue] = useContext(SearchContext);
  const { data: users = [], isLoading } = useGetUsersQuery(searchValue);

  if (isLoading) {
    return <h2>loading...</h2>;
  }

  return (
    <div className={styles.users}>
      {users.map((user) => (
        <User
          user={user}
          key={user.id}
        />
      ))}
    </div>
  );
};
