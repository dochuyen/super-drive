import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./Product.module.scss";
import { GrFormNextLink } from "react-icons/gr";
import { AiOutlineHeart, AiOutlineEye } from "react-icons/ai";
import { BsCartPlus } from "react-icons/bs";
import { Row, Col } from "react-bootstrap";
import {
  Link,
  useParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import axios from "axios";
const cx = classNames.bind(styles);
const Product = () => {
  const next = useNavigate();
  const result = useParams();
  const dispatch = useDispatch();
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

  const [products, setProducts] = useState([]);
  const [cartLength, setCartLength] = useState();
  const emailUser = useSelector((state) => state.email);
  const [pageAction, setPageAction] = useState(1);
  const token = localStorage.getItem("token");
  const [searchParams, setSearchParams] = useSearchParams();
  const productsPerPage = 8;
  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (pageAction - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const displayedProducts = products.slice(startIndex, endIndex);
  const goToPage = (pageNumber) => {
    setPageAction(pageNumber);
  };
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
          console.log(response.data.data.cartitem);
          dispatch({ type: "SET_CART", payload: response.data.data.cartitem });
        } catch (error) {
          console.log(error);
        }
      };

      fetchData();
    }
  };

  useEffect(() => {
    if (result.id) {
      axios
        .get(
          `${process.env.REACT_APP_API_KEY}/api/product/getBrand/${result.id}`
        )
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => console.log(error));
    } else {
      axios
        .get(`${process.env.REACT_APP_API_KEY}/api/product`)
        .then((response) => {
          setProducts(response.data.data);
        })
        .catch((error) => console.log(error));
    }
  }, [result.id]);

  useEffect(() => {
    console.log(searchParams.get("min"), searchParams.get("max"));
    if (searchParams.get("min") && searchParams.get("max")) {
      axios
        .get(
          `${
            process.env.REACT_APP_API_KEY
          }/api/product/sort?minPrice=${searchParams.get(
            "min"
          )}&maxPrice=${searchParams.get("max")}`
        )
        .then((response) => {
          console.log(response.data.productData);
          setProducts(response.data.productData);
        })
        .catch((error) => console.log(error));
    }
  }, [searchParams]);

  return (
    <div className={cx("wrapper")}>
      <p className={cx("option")}>
        <GrFormNextLink /> Showing page <span className={cx("action")}>1</span>
      </p>

      <div className={cx("product")}>
        <Row className={cx("responsive")}>
          {displayedProducts.map((product, _id) => (
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
                    loading="lazy"
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
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
          (page, index) => (
            <span
              key={index}
              style={pageAction === page ? { border: "1px solid #5d5d5d" } : {}}
              onClick={() => goToPage(page)}
              className={cx("item-page")}
            >
              {page}
            </span>
          )
        )}
      </div>
    </div>
  );
};

export default Product;
