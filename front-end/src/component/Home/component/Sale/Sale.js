import React from "react";
import styles from "./Sale.module.scss";
import classNames from "classnames/bind";
import { Row, Col, Container } from "react-bootstrap";
import img1 from "../../../../accets/homecar/1.png";

const cx = classNames.bind(styles);
const Sale = () => (
  <Container>
    <Row>
      <Col sm="12" md="6">
        <a
          alt="Mythrill"
          target="_blank"
          style={{ textAlign: "center", alignItems: "center" }}
        >
          <div className={cx("card")}>
            <div className={cx("wrapper")}>
              <img
                src="https://images.pexels.com/photos/905554/pexels-photo-905554.jpeg?auto=compress&cs=tinysrgb&w=600"
                className={cx("cover-image")}
              />
            </div>

            <img src={img1} className={cx("character")} />
          </div>
        </a>
      </Col>

      <Col
        sm="12 "
        md="6"
        style={{ textAlign: "center", alignItems: "center" }}
      >
        <a alt="Mythrill" target="_blank">
          <div className={cx("card")}>
            <div className={cx("wrapper")}>
              <img
                src="https://images.pexels.com/photos/11921988/pexels-photo-11921988.jpeg?auto=compress&cs=tinysrgb&w=600"
                className={cx("cover-image")}
              />
            </div>
            <img src={img1} className={cx("character")} />
          </div>
        </a>
      </Col>
    </Row>
  </Container>
);

export default Sale;
