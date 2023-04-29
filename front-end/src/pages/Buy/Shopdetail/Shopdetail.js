import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./Shopdetail.module.scss";
import axios from "axios";
import {
  AiOutlineRight,
  AiOutlineEye,
  AiOutlineHeart,
  AiFillHeart,
} from "react-icons/ai";
import { BsCartPlus } from "react-icons/bs";
import { Container, Row, Col } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useParams } from "react-router-dom";

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
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 772,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 568,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };
  const [heart, setHeart] = useState(false);
  const [products, setProducts] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/product/shopdetail/${details.id}`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => console.log(error));
  }, [details.id]);
  const handleAddProduct = (product) => {
    const productList = JSON.parse(localStorage.getItem("cartItems")) || [];
    productList.push(product);
    localStorage.push("cartItems", JSON.stringify(productList));
  };

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
                    <img src={products.images} alt="" height="325px" />
                  </div>
                </Col>
              </div>
            </Col>

            <Col lg={4}>
              <div className={cx("detail-content")}>
                <h2 className={cx("detail-title")}>{products.title}</h2>
                <p className={cx("type")}>Nissan</p>
                <p className={cx("detail-price")}>{products.price}</p>
                <button className={cx("detail-btn")}>Add to Bag</button>
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
          <img
            src="https://tse1.mm.bing.net/th?id=OIP.5CmhYL1kfc68xJo5gt8eawHaEK&pid=Api&P=0"
            alt=""
          />
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
              <div key={""} className={cx("box")}>
                <Link to="/shopdetail" className={cx("img-car")}>
                  <img className={cx("picture")} src=""  alt=""/>
                </Link>
                <div className={cx("car")}>
                  <div className={cx("icons")}>
                    <Link to="/shopdetail" className={cx("eye")}>
                      <AiOutlineEye />
                    </Link>
                    <span className={cx("heart")}>
                      {!heart ? (
                        <AiOutlineHeart />
                      ) : (
                        <AiFillHeart className={cx("icon-heart")} />
                      )}
                    </span>
                  </div>
                  <button
                    className={cx("add")}
                    onClick={() => handleAddProduct()}
                  >
                    <BsCartPlus />
                  </button>
                  <Link to="/shopdetail" className={cx("info")}>
                    <div className={cx("title")}>BMW</div>
                    <p className={cx("name-car")}>GTR</p>
                    <div className={cx("price-car")}>
                      <span className={cx("sale-price")}>$20.000</span>- $15.730
                    </div>
                  </Link>
                </div>
              </div>
            </Slider>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Shopdetail;
