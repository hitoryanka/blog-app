import { useContext, useRef, useState } from "react";
import styles from "./search.module.css";
import search from "../../../../public/search.png";
import searchHover from "../../../../public/search-hover.png";
import { DataContext } from "../../../App";
import { useGetAllUsersQuery, useGetPostsQuery } from "../../../features/posts";
import { getUserId, isUserPage } from "../../../utils/lib";

export const Search = () => {
  const [imgSrc, setImgSrc] = useState(search);

  const ref = useRef<HTMLInputElement>(null);

  const {
    posts: [, setPosts],
    users: [, setUsers],
  } = useContext(DataContext);

  // default list, to update search
  const userId = getUserId();
  const { data: posts, isSuccess: isPostsSuccess } = useGetPostsQuery(userId);
  const { data: users, isSuccess: isUsersSuccess } = useGetAllUsersQuery();

  const handleSearch = () => {
    // TODO make it a wrapper for userSearch and postSearch
    if (!ref.current) {
      throw new Error("input is not in ref");
    }
    const inputValue = ref.current.value.toLowerCase();

    if (isUserPage()) {
      if (!isUsersSuccess) {
        throw new Error("users not fetched yet");
      }

      setUsers(
        [...users].filter(
          ({ name, username }) =>
            name.toLowerCase().includes(inputValue) ||
            username.toLowerCase().includes(inputValue)
        )
      );
      return;
    }

    if (!isPostsSuccess) {
      throw new Error("posts is not fetched yet");
    }

    setPosts(
      [...posts].filter(
        ({ title, body }) =>
          title.toLowerCase().includes(inputValue) ||
          body.toLowerCase().includes(inputValue)
      )
    );
  };

  return (
    <div className={styles.search}>
      <input
        type="text"
        ref={ref}
        onChange={handleSearch}
      />
      <img
        onClick={handleSearch}
        onMouseEnter={() => setImgSrc(searchHover)}
        onMouseLeave={() => setImgSrc(search)}
        src={imgSrc}
        alt="search"
      />
    </div>
  );
};
