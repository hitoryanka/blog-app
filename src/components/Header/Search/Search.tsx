import { useContext, useState } from "react";
import styles from "./search.module.css";
import search from "../../../../public/search.png";
import searchHover from "../../../../public/search-hover.png";
import { SearchContext } from "../../../App";

export const Search = () => {
  const [imgSrc, setImgSrc] = useState(search);

  const [searchValue, setSearchValue] = useContext(SearchContext);

  return (
    <div className={styles.search}>
      <input
        type="text"
        value={searchValue}
        onChange={({ target }) => setSearchValue(target.value)}
      />
      <img
        onMouseEnter={() => setImgSrc(searchHover)}
        onMouseLeave={() => setImgSrc(search)}
        src={imgSrc}
        alt="search"
      />
    </div>
  );
};
