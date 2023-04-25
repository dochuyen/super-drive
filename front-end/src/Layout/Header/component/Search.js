import React, { useState } from "react";
import axios from "axios";
import classNames from "classnames/bind";
import styles from "./Search.module.scss";

const cx = classNames.bind(styles);
const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  console.log(searchQuery);
  console.log(products);
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:8080/api/product/search?q=${searchQuery}`
      );
      setProducts(response.data.productData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSearch}>
        <input
          className={cx("search")}
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>
      {products.map((product) => (
        <div key={product._id}>
          <p>{product.title}</p>
        </div>
      ))}
    </>
  );
};

export default Search;
