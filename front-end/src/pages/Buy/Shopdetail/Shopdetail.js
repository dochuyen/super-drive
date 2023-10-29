import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./Shopdetail.module.scss";
import axios from "axios";
import { AiOutlineRight, AiOutlineEye, AiOutlineHeart } from "react-icons/ai";
import { BsCartPlus } from "react-icons/bs";
import { Container, Row, Col } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useParams, useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);
const Shopdetail = () => {
  const details = useParams();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
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
  const [products, setProducts] = useState({});
  const [randomProducts, setRandomProducts] = useState([]);

  const token = localStorage.getItem("token");

  const next = useNavigate();

  const handleAddProduct = (products) => {
    if (!token) {
      alert("Bạn cần đăng nhập !");
      next("/login");
    } else {
      const fetchData = async () => {
        try {
          const response = await axios.put(
            `${process.env.REACT_APP_API_KEY}/api/cart/add`,
            {
              productId: products._id,
              title: products.title,
              price: products.price,
              quantity: 1,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        } catch (error) {
          console.log(error);
        }
      };

      fetchData();
    }
  };

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_KEY}/api/product/shopdetail/${details.id}`
      )
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => console.log(error));
  }, [details.id]);

  
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}/api/product`)
      .then((response) => {
        setRandomProducts(response.data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("toolbar")}>
        <Container>
          <h3 className={cx("toolbar-title")}>Checkout</h3>
          <div className={cx("directional")}>
            <div>
              Home <AiOutlineRight className={cx("icon-tool")} />
            </div>
            <div>
              Buy <AiOutlineRight className={cx("icon-tool")} />
            </div>
            <div className={cx("end")}>Shopdetail</div>
          </div>
        </Container>
      </div>
      <Container>
        <Row>
          <div className={cx("detail-header")}>
            <Col lg={8}>
              <div className={cx("img")}>
                <Col lg={2}>
                  <Row>
                    <div className={cx("img-list")}>
                      <Col sm={3}>
                        <img
                          src="https://tse1.mm.bing.net/th?id=OIP.5CmhYL1kfc68xJo5gt8eawHaEK&pid=Api&P=0"
                          alt=""
                        />
                      </Col>
                      <Col sm={3}>
                        <img
                          src="https://tse1.mm.bing.net/th?id=OIP.5CmhYL1kfc68xJo5gt8eawHaEK&pid=Api&P=0"
                          alt=""
                        />
                      </Col>
                      <Col sm={3}>
                        <img
                          src="https://tse1.mm.bing.net/th?id=OIP.5CmhYL1kfc68xJo5gt8eawHaEK&pid=Api&P=0"
                          alt=""
                        />
                      </Col>
                      <Col sm={3}>
                        <img
                          src="https://tse1.mm.bing.net/th?id=OIP.5CmhYL1kfc68xJo5gt8eawHaEK&pid=Api&P=0"
                          alt=""
                        />
                      </Col>
                    </div>
                  </Row>
                </Col>
                <Col lg={10}>
                  <div className={cx("img-big")}>
                    <img src={products.images} alt="" height="400px" />
                  </div>
                </Col>
              </div>
            </Col>

            <Col lg={4}>
              <div className={cx("detail-content")}>
                <h2 className={cx("detail-title")}>{products.title}</h2>

                <p className={cx("detail-price")}>${products.price}</p>
                <button
                  onClick={() => handleAddProduct(products)}
                  className={cx("detail-btn")}
                >
                  Add to Bag
                </button>
                <button className={cx("detail-heart")}>
                  Favorite
                  <span>
                    <AiOutlineHeart />
                  </span>
                </button>
              </div>
            </Col>
          </div>
        </Row>
      </Container>

      <div className={cx("detail-introduce")}>
        <Col lg={12}>
          <div className={cx("introduce-title")}>Explore the GTR</div>
          <img src={products.images} alt="" />
          <p className={cx("introduce-text")}>
            The stitched leather overlays on the upper add heritage style,
            durability and support.
          </p>
        </Col>
      </div>
      <div className={cx("product-involve")}>
        <Container>
          <div className={cx("involve-title")}>
            <p className={cx("involve-text")}>You Might Also Like</p>
          </div>

          <div className={cx("random-product")}>
            <Slider {...settings}>
              {randomProducts.map((randomProduct, _id) => (
                <div key={randomProduct._id} className={cx("box")}>
                  <Link
                    to={"/shopdetail/" + randomProduct._id}
                    className={cx("img-car")}
                  >
                    <img
                      className={cx("picture")}
                      src={randomProduct.images}
                      alt=""
                    />
                  </Link>
                  <div className={cx("car")}>
                    <div className={cx("icons")}>
                      <Link
                        to={"/shopdetail/" + randomProduct._id}
                        className={cx("eye")}
                      >
                        <AiOutlineEye />
                      </Link>
                    </div>
                    <button
                      className={cx("add")}
                      onClick={() => handleAddProduct()}
                    >
                      <BsCartPlus />
                    </button>
                    <Link
                      to={"/shopdetail/" + randomProduct._id}
                      className={cx("info")}
                    >
                      <div className={cx("title")}>{randomProduct.title}</div>
                      <p className={cx("name-car")}>
                        {randomProduct.description}
                      </p>
                      <div className={cx("price-car")}>
                        <span className={cx("sale-price")}>
                          ${randomProduct.price}
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Shopdetail;
