import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./Product.module.scss";
import { GrFormNextLink } from "react-icons/gr";
import { AiOutlineHeart, AiOutlineEye, AiFillHeart } from "react-icons/ai";
import { BsCartPlus } from "react-icons/bs";
import { Row, Col } from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import axios from "axios";
const cx = classNames.bind(styles);
const Product = () => {
  const next = useNavigate();
  const result = useParams();

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

  const [pageAction, setPageAction] = useState(1);
  const [products, setProducts] = useState([]);
  const [cartLength, setCartLength] = useState();
  const emailUser = useSelector((state) => state.email);
 

  
  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    if (result.id) {
      axios
        .get(`http://localhost:8080/api/product/getBrand/${result.id}`)
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => console.log(error));
    } else {
      axios
        .get("http://localhost:8080/api/product")
        .then((response) => {
          setProducts(response.data.productData);
        })
        .catch((error) => console.log(error));
    }
  }, [result.id]);

  const handleAddProduct = (product) => {
    if (!token) {
      alert("Bạn cần đăng nhập !");
      next("/login");
    } else {
      const fetchData = async () => {
        try {
          const response = await axios.put(
            `http://localhost:8080/api/cart/add`,
            {
              productId: product._id,
              title: product.title,
              price: product.price,
              quantity: 1,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(response.data.data.cartitem);
          setCartLength(response.data.data.cartitem);
        } catch (error) {
          console.log(error);
        }
      };

      fetchData();
    }
  };

  return (
    <div className={cx("wrapper")}>
      <p className={cx("option")}>
        <GrFormNextLink /> Showing page <span className={cx("action")}>1</span>
      </p>

      <div className={cx("product")}>
        <Row>
          {products.map((product, _id) => (
            <Col xs={12} sm={6} md={6} lg={4} xl={3} key={_id}>
              <div className={cx("box")}>
                <Link
                  to={"/shopdetail/" + product._id}
                  className={cx("img-car")}
                >
                  <img
                    className={cx("picture")}
                    src={product.images}
                    alt=""
                    width="100%"
                  />
                </Link>
                <div className={cx("car")}>
                  <div className={cx("icons")}>
                    <Link to="/shopdetail" className={cx("eye")}>
                      <AiOutlineEye />
                    </Link>
                    <span className={cx("heart")}>
                      <AiOutlineHeart />
                    </span>
                  </div>
                  <button
                    className={cx("add")}
                    onClick={() => handleAddProduct(product)}
                  >
                    <BsCartPlus />
                  </button>
                  <Link to="/shopdetail" className={cx("info")}>
                    <h1 className={cx("title")}>{product.title}</h1>
                    <p className={cx("name-car")}>{product.description}</p>
                    <div className={cx("price-car")}>
                      <span className={cx("sale-price")}>$</span>
                      {product.price}
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