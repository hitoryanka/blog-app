import { useGetAllUsersQuery } from "../../features/posts";
import { User } from "./User/User";
import styles from "./users.module.css";

export const Users = () => {
  const { data } = useGetAllUsersQuery();

  if (!data) {
    return <h2>Loading..</h2>;
  }

  return (
    <div className={styles.users}>
      {data.map((user) => (
        <User
          user={user}
          key={user.id}
        />
      ))}
    </div>
  );
};
