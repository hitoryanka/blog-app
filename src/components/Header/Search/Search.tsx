import { useContext, useRef, useState } from "react";
import styles from "./search.module.css";
import search from "../../../../public/search.png";
import searchHover from "../../../../public/search-hover.png";
import { DataContext } from "../../../App";

export const Search = () => {
  const [imgSrc, setImgSrc] = useState(search);

  const ref = useRef<HTMLInputElement>(null);

  const {
    posts: [, setPosts],
  } = useContext(DataContext);

  const handleSearch = () => {
    if (!ref.current) {
      throw new Error("input is not in ref");
    }

    const inputValue = ref.current.value;

    setPosts((prev) =>
      prev.filter(
        ({ title, body }) =>
          title.includes(inputValue) || body.includes(inputValue)
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
