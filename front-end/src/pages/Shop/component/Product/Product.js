import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./Product.module.scss";
import { GrFormNextLink } from "react-icons/gr";
import { AiOutlineHeart, AiOutlineEye, AiFillHeart } from "react-icons/ai";
import { BsCartPlus } from "react-icons/bs";
import { Row, Col } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
const cx = classNames.bind(styles);
const Product = () => {
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

  const [heart, setHeart] = useState(false);
  const [pageAction, setPageAction] = useState(1);
  const [products, setProducts] = useState([]);
  const emailUser = JSON.parse(localStorage.getItem("email"));
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/product/getBrand/${result.id}`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => console.log(error));
  }, [result.id]);
  // useEffect(()=>{
  //   axios
  //   .get('http://localhost:8080/api/product')
  //   .then((res)=>{
  //     setProducts(res.data)
  //     console.log(res.data)
  //   })
  //   .catch((error)=>{
  //     console.log(error)
  //   })
  // }, [])

  const handleAddProduct = (product) => {
    const fetchData = async () => {
      try {
        const response = await axios.put(`http://localhost:8080/api/add-cart`, {
          email: emailUser,
          productId: product._id,
          quantity: 1,
        });
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
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
