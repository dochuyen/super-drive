import React, { useState } from "react";
import axios from "axios";
import classNames from "classnames/bind";
import styles from "./Search.module.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AiOutlineEye } from "react-icons/ai";

import { Link } from "react-router-dom";

const cx = classNames.bind(styles);
const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [hidden, setHidden] = useState(false);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    centerPadding: "200px",
    slidesToScroll: 1,
    autoplay: true,
    autoplayspeed: 1000,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },

      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 568,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  const handleHidden = () => {
    setHidden(false);
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_KEY}/api/product/search?q=${searchQuery}`
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
          <div className={cx("slide-search")}>
            <Slider {...settings}>
              {products.map((product) => (
                <div key={product._id} className={cx("box")}>
                  <Link
                    to={"/shopdetail/" + product._id}
                    className={cx("img-car")}
                  >
                    <img
                      className={cx("picture")}
                      src={product.images}
                      alt=""
                    />
                  </Link>
                  <div className={cx("car")}>
                    <Link
                      to={"/shopdetail/" + product._id}
                      className={cx("info")}
                    >
                      <div className={cx("title")}>{product.title}</div>
                      <p className={cx("name-car")}>{product.description}</p>
                      <div className={cx("price-car")}>${product.price}</div>
                    </Link>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
          <div className={cx("hidden")} onClick={handleHidden}></div>
        </div>
      )}
    </div>
  );
};

export default Search;
