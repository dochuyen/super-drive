import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import Form from "react-bootstrap/Form";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import classNames from "classnames/bind";
import styles from "./Blog.module.scss";

const cx = classNames.bind(styles);
const Blog = () => {
  const blogData = [
    {
      title: "Blog 1",
      discriptions: "bài 1",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSku11THyazq5qxc17AmBnusnk9dY7nPyiB2Q&usqp=CAU",
    },
  ];

  return (
    <>
      <div>
        <img
          src="https://media1.nguoiduatin.vn/thumb_x640x384/media/truong-cong-hieu/2021/01/19/lo-dien-mot-sieu-xe-chi-danh-rieng-cho-nguoi-my.gif"
          alt=""
          width="100%"
          height="550px"
        />
      </div>
      <Container>
        <Row>
          <Col md={8}>
            <div>
              <img src="" alt="" />
              <h3>
                Dolorum optio tempore voluptas dignissimos cumque fuga qui
                quibusdam quia
              </h3>
            </div>
          </Col>
          <Col md={4}>2</Col>
        </Row>
      </Container>
    </>
  );
};
export default Blog;
