import React, {useState} from "react";

import classNames from "classnames/bind";
import styles from "./List.module.scss";

import { AiFillHeart, AiOutlineHeart, AiOutlineEye } from "react-icons/ai";
import { BsCartPlus } from "react-icons/bs";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);
const ListNewCar = () => {
  const [heart, setHeart] = useState(false);

  const handleHeart = () => {
    setHeart(heart === false ? true : false);
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("box")}>
        <Link to="/shopdetail" className={cx("img-car")}>
          <img
            className={cx("picture")}
            src="https://tse2.mm.bing.net/th?id=OIP.jP1affsIOeZfzgBUNECqrAHaE7&pid=Api&P=0"
          />
        </Link>
        <div className={cx("car")}>
          <div className={cx("icons")}>
            <Link to='/shopdetail' className={cx("eye")}>
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
          <button className={cx("add")}>
            <BsCartPlus />
          </button>
          <Link to="/shopdetail" className={cx("info")}>
            <div className={cx("title")}>BMW</div>
            <p className={cx("name-car")}>GTR</p>
            <div className={cx("price-car")}>
              <span className={cx("sale-price")}>$20.000</span>- $15,730*
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ListNewCar;
