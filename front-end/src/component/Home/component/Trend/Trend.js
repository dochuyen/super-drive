import React from "react";
import classNames from "classnames/bind";
import styles from "./Trend.module.scss";
import { AiOutlineCalendar } from "react-icons/ai";
import gifFerrari from "../../../../assets/gif/trend1.gif";
import gifGtr from "../../../../assets/gif/gtr-trend.gif";
import gifLamborghini from "../../../../assets/gif/lambogini-trend.gif";
import { Col, Row } from "react-bootstrap";

const cx = classNames.bind(styles);
const Trend = () => {
  const dataGif = [
    {
      src: gifFerrari,
      name: "Ferrari",
    },
    {
      src: gifGtr,
      name: "Gtr",
    },
    {
      src: gifLamborghini,
      name: "Lamborghini",
    },
  ];

  return (
    <div className={cx("wrapper")}>
      <div className={cx("title")}>
        <h5 className={cx("small-title")}>LATEST NEWS</h5>
        <h2 className={cx("big-title")}>New Trends</h2>
      </div>
      <Row sm="12" md="3" lg="3">
        {dataGif.map((gif, index) => (
          <Col key={index}>
            <div
              className={cx("gif")}
              style={{ backgroundImage: `url(${gif.src})` }}
            ></div>
            <div className={cx("type")}>
              <p className={cx("calendar")}>
                <AiOutlineCalendar className={cx("icon-calendar")} />
                24/03/2023
              </p>
              <p className={cx("title-ctt")}>{gif.name}</p>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Trend;
