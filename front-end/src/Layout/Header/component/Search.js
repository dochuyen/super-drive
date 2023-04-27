import React, { useState } from "react";
import axios from "axios";
import classNames from "classnames/bind";
import styles from "./Search.module.scss";
const cx = classNames.bind(styles);
const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  console.log(searchQuery);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:8080/api/product/search?q=${searchQuery}`
      );
      setProducts(response.data.productData);
      console.log(products)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={cx('wrapper')}>
      <form onSubmit={handleSearch}>
        <input
          className={cx("search")}
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>
      <div className={cx('result')}>
        {products.map((product) => (
          <div key={product._id}>
            <h2>{product.title}</h2>
            <img src={product.img}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
