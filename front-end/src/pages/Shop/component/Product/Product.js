import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./Product.module.scss";
import { GrFormNextLink } from "react-icons/gr";
import { AiOutlineHeart, AiOutlineEye, AiFillHeart } from "react-icons/ai";
import { BsCartPlus } from "react-icons/bs";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
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
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/product")
      .then((response) => {
        setProducts(response.data.productData);
      })
      .catch((error) => console.log(error));
  }, []);

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
            <Col xs={12} sm={6} md={6} lg={4} xl={3} key={index}>
              <div className={cx("box")}>
                <Link to="/shopdetail" className={cx("img-car")}>
                  <img
                    className={cx("picture")}
                    src={product.images}
                    width="100%"
                  />
                </Link>
                <div className={cx("car")}>
                  <div className={cx("icons")}>
                    <Link to="/shopdetail" className={cx("eye")}>
                      <AiOutlineEye />
                    </Link>
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
                  <Link to="/shopdetail" className={cx("info")}>
                    <div className={cx("title")}>{product.brand}</div>
                    <p className={cx("name-car")}>GTR</p>
                    <div className={cx("price-car")}>
                      <span className={cx("sale-price")}>$20.000</span>- $15.730
                    </div>
                  </Link>
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
