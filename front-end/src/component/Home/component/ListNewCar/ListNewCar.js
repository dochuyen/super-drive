import React from "react";
import { Carousel, Col, Row, Card, Button } from "react-bootstrap";
import classNames from "classnames/bind";
import styles from "./List.module.scss";
import { IoIosAddCircle } from "react-icons/io";
import { AiFillHeart, AiOutlineHeart, AiOutlineEye } from "react-icons/ai";
import { BsCartPlus } from "react-icons/bs";

const cx = classNames.bind(styles);
const ListNewCar = () => {
  return (
    <div className={cx("wrapper")}>
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
          <div className={cx('info')}>
            <div className={cx('title')}>BMW</div>
            <p className={cx("name-car")}>GTR</p>
            <div className={cx("price-car")}>
            <span className={cx('sale-price')}>$20.000</span>
             - $15,730*</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListNewCar;
