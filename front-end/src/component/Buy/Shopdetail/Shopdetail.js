import React from "react";
import classNames from "classnames/bind";
import styles from "./Shopdetail.module.scss";
import {
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineEye,
  AiOutlineHeart,
} from "react-icons/ai";
import { BsCartPlus, BsCurrencyDollar } from "react-icons/bs";
import { Container, Row, Col } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const cx = classNames.bind(styles);
const Shopdetail = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
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
                  <div className={cx("img-list")}>
                    <img
                      src="https://tse1.mm.bing.net/th?id=OIP.5CmhYL1kfc68xJo5gt8eawHaEK&pid=Api&P=0"
                      alt=""
                    />
                    <img
                      src="https://tse1.mm.bing.net/th?id=OIP.5CmhYL1kfc68xJo5gt8eawHaEK&pid=Api&P=0"
                      alt=""
                    />
                  </div>
                </Col>
                <Col lg={10}>
                  <div className={cx("img-big")}>
                    <img
                      src="https://tse1.mm.bing.net/th?id=OIP.5CmhYL1kfc68xJo5gt8eawHaEK&pid=Api&P=0"
                      alt=""
                    />
                  </div>
                </Col>
              </div>
            </Col>

            <Col lg={4}>
              <div className={cx("detail-content")}>
                <h2 className={cx("detail-title")}>GTR R28</h2>
                <p className={cx("type")}>Nissan</p>
                <p className={cx("detail-price")}> $10,000</p>
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
          <div className={cx("involve-title")}>
            <p className={cx("involve-text")}>You Might Also Like</p>
            <div className={cx("icon-detail")}>
              <button className={cx("icon-next")}>
                <AiOutlineLeft />
              </button>
              <button className={cx("icon-next")}>
                <AiOutlineRight />
              </button>
            </div>
          </div>
          <div>
            <Slider {...settings}>
              <div className={cx("box")}>
                <div className={cx("img-car")}>
                  <img
                    className={cx("picture")}
                    src="https://tse2.mm.bing.net/th?id=OIP.jP1affsIOeZfzgBUNECqrAHaE7&pid=Api&P=0"
                  />
                </div>
                <div className={cx("car")}>
                  <div className={cx("icons")}>
                    <span className={cx("eye")}>
                      <AiOutlineEye />
                    </span>
                    <span className={cx("heart")}>
                      <AiOutlineHeart />
                    </span>
                  </div>
                  <button className={cx("add")}>
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
              
            </Slider>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Shopdetail;
