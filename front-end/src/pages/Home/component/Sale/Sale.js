import React from "react";
import styles from "./Sale.module.scss";
import classNames from "classnames/bind";
import img1 from "../../../../assets/homecar/1.png";
import img2 from "../../../../assets/homecar/2.png";
import { AnimationOnScroll } from "react-animation-on-scroll";

const cx = classNames.bind(styles);
const Sale = () => {
  return (
    <div className={cx("container")}>
      <AnimationOnScroll animateIn="animate__fadeInLeft">
        <a alt="Mythrill" target="_blank">
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
            <img src={img1} className={cx("character")} />
          </div>
        </a>
      </AnimationOnScroll>

      <AnimationOnScroll animateIn='animate__fadeInRight'>
      <a alt="Mythrill" target="_blank">
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
          <img src={img2} className={cx("character")} />
        </div>
      </a>
      </AnimationOnScroll>
    </div>
  );
};

export default Sale;
