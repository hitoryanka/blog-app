import { useState } from "react";
import styles from "./search.module.css";
import search from "../../../../public/search.png";
import searchHover from "../../../../public/search-hover.png";

export const Search = () => {
  const [imgSrc, setImgSrc] = useState(search);

  return (
    <div className={styles.search}>
      <input type="text" />
      <img
        onMouseEnter={() => setImgSrc(searchHover)}
        onMouseLeave={() => setImgSrc(search)}
        src={imgSrc}
        alt="search"
      />
    </div>
  );
};
