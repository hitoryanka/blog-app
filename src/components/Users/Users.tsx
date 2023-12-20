import { useGetAllUsersQuery } from "../../features/posts";
import { User } from "./User/User";
import styles from "./users.module.css";

export const Users = () => {
  const { data: users = [], isLoading } = useGetAllUsersQuery();

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
