import React, { useState } from "react";
import axios from "axios";
import classNames from "classnames/bind";
import styles from "./Search.module.scss";

import { Link } from "react-router-dom";


const cx = classNames.bind(styles);
const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [hidden, setHidden] = useState(false);

  const handleHidden = () => {
    setHidden(false)
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:8080/api/product/search?q=${searchQuery}`
      );
      setProducts(response.data.productData);
      setHidden(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={cx("wrapper")}>
      <form onSubmit={handleSearch}>
        <input
          className={cx("search")}
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>
      {hidden && (
        <div className={cx("result")}>
          {products.map((product) => (
            <>
              <div key={product._id} className={cx("box")}>
                <Link to="/shopdetail" className={cx("img-car")}>
                  <img className={cx("picture")} src={product.images} />
                </Link>
                <div className={cx("car")}>
                  <Link to="/shopdetail" className={cx("info")}>
                    <div className={cx("title")}>{product.title}</div>

                    <div className={cx("price-car")}>
                      <span className={cx("sale-price")}>$20.000</span>- $15.730
                    </div>
                  </Link>
                </div>
              </div>
              <div className={cx("hidden")} onClick={handleHidden}>
                
              </div>
            </>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
