import React from "react";
import classNames from "classnames/bind";
import styles from "./Search.module.scss";

const cx = classNames.bind(styles);
const Search = () => {
  return (
    <>
      <form >
        <input className={cx("search")} type="search" />
      </form>
    </>
  );
};

export default Search;
