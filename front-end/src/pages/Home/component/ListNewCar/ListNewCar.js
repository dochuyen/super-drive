import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames/bind";
import styles from "./List.module.scss";
import { Col, Row } from "react-bootstrap";
import { AiOutlineHeart, AiOutlineEye } from "react-icons/ai";
import { BsCartPlus } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const cx = classNames.bind(styles);
const ListNewCar = () => {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");

  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_KEY}/api/product/getBrand/64416645196081acc2643442`
      )
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => console.log(error));
  }, []);
  const next = useNavigate();
  const handleAddProduct = (product) => {
    if (!token) {
      alert("Bạn cần đăng nhập !");
      next("/login");
    } else {
      const fetchData = async () => {
        try {
          const response = await axios.put(
            `${process.env.REACT_APP_API_KEY}/api/cart/add`,
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
          dispatch({ type: "SET_CART", payload: response.data.data.cartitem });
        } catch (error) {
          console.log(error);
        }
      };

      fetchData();
    }
  };
  return (
    <Row>
      {products.map((product, _id) => (
        <Col xs={12} sm={6} md={6} lg={6} xl={4} key={_id}>
          <div className={cx("box")}>
            <Link to={"/shopdetail/" + product._id} className={cx("img-car")}>
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
  );
};

export default ListNewCar;
