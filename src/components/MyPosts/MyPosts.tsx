import { IAuthUser } from "../../utils/types";

export const MyPosts = () => {
  const userString = localStorage.getItem("currentUser");
  const user: IAuthUser | null = userString ? JSON.parse(userString) : null;
  if (user === null) {
    throw new Error("user isn't logged in");
  }

  return (
    <div>
      <h2>MyPosts</h2>
      {!user.posts.length && (
        <h3>Looks like you haven't written any posts yet!</h3>
      )}
      <button>create Post</button>
      <ul>
        {user.posts.map((post) => (
          <li>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};
