import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Shopdetail.module.scss";
import {
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineEye,
  AiOutlineHeart,
  AiFillHeart,
} from "react-icons/ai";
import { BsCartPlus, BsCurrencyDollar } from "react-icons/bs";
import { Container, Row, Col } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Link} from 'react-router-dom'

const cx = classNames.bind(styles);
const Shopdetail = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    centerPadding: "200px",
    slidesToScroll: 1,
    autoplay: true,
    autoplayspeed: 1000,
    nextArrow: <button className={cx("slick-next")} />,
    responsive: [
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
        },
      },

      {
        breakpoint: 772,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };
  const [heart, setHeart] = useState(false);
  const [products, setProducts] = useState([
    {
      id: 1,
      img: "https://znews-photo.zingcdn.me/w660/Uploaded/ebhuiwh/2022_02_10/2022_Koenigsegg_Expansion_Announcement_1.jpg",
    },
    {
      id: 2,
      img: "https://media.auto5.vn/files/hoanghai98/2021/03/20/mc%207-095647.jpeg",
    },
    {
      id: 3,
      img: "https://cafefcdn.com/203337114487263232/2022/12/9/photo-24-16705931840871741252566.jpg",
    },

    {
      id: 4,
      img: "https://cdn.baogiaothong.vn/upload/images/2020-2/album_img/2020-04-25/nguoi-dep-porsche-911-1-1587757294-width1004height565.jpg",
    },
    {
      id: 5,
      img: "https://autopro8.mediacdn.vn/2020/5/6/11-15887664230931119062938.jpg",
    },

    {
      id: 6,
      img: "https://fptshop.com.vn/Uploads/images/1(270).jpg",
    },
    {
      id: 7,
      img: "https://danviet.mediacdn.vn/upload/1-2017/images/2017-03-15/148953874025088-2.jpg",
    },
    {
      id: 8,
      img: "http://anhnendep.net/wp-content/uploads/2016/02/nguoi-dep-va-sieu-xe-15-683x1024.jpg",
    },
    {
      id: 9,
      img: "https://danchoioto.vn/wp-content/uploads/2020/05/xe-mo-hinh-bang-bang-nhua-silicone-hoac-cao-su-duoc-goi-la-dong-xe-resin.jpg",
    },
  ]);
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
            {/* <div className={cx("icon-detail")}>
                <button className={cx("icon-next")}>
                  <AiOutlineLeft />
                </button>
                <button className={cx("icon-next")}>
                  <AiOutlineRight />
                </button>
              </div> */}
          </div>
        
        <div className={cx("random-product")}>
            <Slider {...settings}>
              {products.map((product, index) => (
                <div key={index} className={cx("box")}>
                  <Link to='/shopdetail' className={cx("img-car")}>
                    <img className={cx("picture")} src={product.img} />
                  </Link>
                  <div className={cx("car")}>
                    <div className={cx("icons")}>
                      <Link to='/shopdetail' className={cx("eye")}>
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
                      onClick={() => handleAddProduct(product)}
                    >
                      <BsCartPlus />
                    </button>
                    <Link to='/shopdetail' className={cx("info")}>
                      <div className={cx("title")}>BMW</div>
                      <p className={cx("name-car")}>GTR</p>
                      <div className={cx("price-car")}>
                        <span className={cx("sale-price")}>$20.000</span>-
                        $15.730
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
