import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import classNames from "classnames/bind";
import styles from "./Slider.module.scss";
const cx = classNames.bind(styles);
export const Slider = () => {
  const [active, setActive] = useState(3);

  const handleNext = () => {
    setActive(active === 6 ? 0 : active + 1);
  };

  const handlePrev = () => {
    setActive(active === 0 ? 6 : active - 1);
  };

  return (
    <div className={cx("slider")}>
      {items.map((item, index) => (
        <Carousel key={index}>{item}</Carousel>
      ))}
    </div>
  );
};

const items = [
  <div>
    <h1>Slide 1</h1>
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere magni
    magnam unde ipsam repudiandae explicabo expedita labore, sequi minus neque
    beatae voluptatum, quasi accusamus quia quis voluptas laborum ad! Ab totam
    doloribus, excepturi possimus rem vel quia fugit molestiae officiis!
  </div>,
  <div>
    <h1>Slide 2</h1>
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere magni
    magnam unde ipsam repudiandae explicabo expedita labore, sequi minus neque
    beatae voluptatum, quasi accusamus quia quis voluptas laborum ad! Ab totam
    doloribus, excepturi possimus rem vel quia fugit molestiae officiis!
  </div>,
  <div>
    <h1>Slide 3</h1>
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere magni
    magnam unde ipsam repudiandae explicabo expedita labore, sequi minus neque
    beatae voluptatum, quasi accusamus quia quis voluptas laborum ad! Ab totam
    doloribus, excepturi possimus rem vel quia fugit molestiae officiis!
  </div>,
  <div>
    <h1>Slide 4</h1>
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere magni
    magnam unde ipsam repudiandae explicabo expedita labore, sequi minus neque
    beatae voluptatum, quasi accusamus quia quis voluptas laborum ad! Ab totam
    doloribus, excepturi possimus rem vel quia fugit molestiae officiis!
  </div>,
  <div>
    <h1>Slide 5</h1>
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere magni
    magnam unde ipsam repudiandae explicabo expedita labore, sequi minus neque
    beatae voluptatum, quasi accusamus quia quis voluptas laborum ad! Ab totam
    doloribus, excepturi possimus rem vel quia fugit molestiae officiis!
  </div>,
];
