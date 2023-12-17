import { useGetAllUsersQuery } from "../../features/posts";

export const Users = () => {
  const { data } = useGetAllUsersQuery();

  if (!data) {
    return <h2>Loading..</h2>;
  }

  return (
    <>
      {data.map((user) => (
        <p key={user.id}>
          {user.username} | {user.name}
        </p>
      ))}
    </>
  );
};
