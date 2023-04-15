import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Product.module.scss";
import { GrFormNextLink } from "react-icons/gr";
import { AiOutlineHeart, AiOutlineEye, AiFillHeart } from "react-icons/ai";
import { BsCartPlus } from "react-icons/bs";
import { Row, Col } from "react-bootstrap";

const cx = classNames.bind(styles);
const Product = () => {
  const pages = [
    {
      page: 1,
    },
    {
      page: 2,
    },
    {
      page: 3,
    },
    {
      page: 4,
    },
  ];

  const [heart, setHeart] = useState(false);
  const [pageAction, setPageAction] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([
    {
      picture:
        "https://tse2.mm.bing.net/th?id=OIP.jP1affsIOeZfzgBUNECqrAHaE7&pid=Api&P=0",
    },
    {
      picture:
        "https://tse2.mm.bing.net/th?id=OIP.jP1affsIOeZfzgBUNECqrAHaE7&pid=Api&P=0",
    },
    {
      picture:
        "https://tse2.mm.bing.net/th?id=OIP.jP1affsIOeZfzgBUNECqrAHaE7&pid=Api&P=0",
    },
    {
      picture:
        "https://tse2.mm.bing.net/th?id=OIP.jP1affsIOeZfzgBUNECqrAHaE7&pid=Api&P=0",
    },
  ]);

  const handleAddProduct = (product) => {
    const productList = JSON.parse(localStorage.getItem("cartItems")) || [];
    productList.push(product);
    localStorage.setItem("cartItems", JSON.stringify(productList));
  };

  const handleHeart = () => {
    setHeart(heart === false ? true : false);
  };
  return (
    <div className={cx("wrapper")}>
      <p className={cx("option")}>
        <GrFormNextLink /> Showing page <span className={cx("action")}>1</span>
      </p>

        <div className={cx("product")}>
      <Row>
          {products.map((product, index) => (
            <Col key={index} lg={4}>
              <div  className={cx("box")}>
                <div className={cx("img-car")}>
                  <img className={cx("picture")} src={product.picture} />
                </div>
                <div className={cx("car")}>
                  <div className={cx("icons")}>
                    <span className={cx("eye")}>
                      <AiOutlineEye />
                    </span>
                    <span onClick={handleHeart} className={cx("heart")}>
                      {!heart ? (
                        <AiOutlineHeart />
                      ) : (
                        <AiFillHeart className={cx("icon-heart")} />
                      )}
                    </span>
                  </div>
                  <button
                    className={cx("add")}
                    onClick={() => handleAddProduct(product)}
                  >
                    <BsCartPlus />
                  </button>
                  <div className={cx("info")}>
                    <div className={cx("title")}>BMW</div>
                    <p className={cx("name-car")}>GTR</p>
                    <div className={cx("price-car")}>
                      <span className={cx("sale-price")}>$20.000</span>- $15.730
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          ))}
      </Row>
        </div>

      <div className={cx("page")}>
        {pages.map((page, index) => (
          <span
            key={index}
            style={
              pageAction === page.page
                ? {
                    border: "1px solid #5d5d5d",
                  }
                : {}
            }
            onClick={() => setPageAction(page.page)}
            className={cx("item-page")}
          >
            {page.page}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Product;
