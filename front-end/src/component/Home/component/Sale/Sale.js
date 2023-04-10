import React from "react";
import styles from "./Sale.module.scss";
import classNames from "classnames/bind";
import img1 from '../../../../accets/homecar/1.png'



const cx = classNames.bind(styles);
const Sale = () => {
  return (
    <div className={cx('container')}>
      <a
        alt="Mythrill"
        target="_blank"
      >
        <div className={cx("card")}>
          <div className={cx("wrapper")}>
            <img
              src="https://images.pexels.com/photos/905554/pexels-photo-905554.jpeg?auto=compress&cs=tinysrgb&w=600"
              className={cx("cover-image")}
            />
          </div>
          {/* <img
            src="https://ggayane.github.io/css-experiments/cards/dark_rider-title.png"
            className={cx("title")}
          /> */}
          <img
            src={img1}
            className={cx("character")}
          />
        </div>
      </a>

      <a
        alt="Mythrill"
        target="_blank"
      >
        <div className={cx("card")}>
          <div className={cx("wrapper")}>
            <img
              src="https://images.pexels.com/photos/11921988/pexels-photo-11921988.jpeg?auto=compress&cs=tinysrgb&w=600"
              className={cx("cover-image")}
            />
          </div>
          {/* <img
            src="https://ggayane.github.io/css-experiments/cards/dark_rider-title.png"
            className={cx("title")}
          /> */}
          <img
            src={img1}
            className={cx("character")}
          />
        </div>
      </a>

    </div>
  );
};

export default Sale;
