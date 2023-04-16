import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Slider from "react-slick";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import classNames from "classnames/bind";
import styles from "./Blog.module.scss";
import ListNewCar from "../Home/component/ListNewCar/ListNewCar";

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
       
        <Row
          style={{
            position: "static",
          }}
        >
          <Col xs={12} md={6} lg={4}>
            <Card style={{ width: "100%", marginTop: "20px" }}>
              <Card.Img
                variant="top"
                width="150px"
                height="200px"
                src="https://sohanews.sohacdn.com/thumb_w/660/2018/10/2/image-12-1538483239360278266980-1538485472308424302289.png"
              />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <h1>Comment</h1>
            <Form>
              <input
                type="text"
                placeholder="UserName"
                style={{
                  width: "100%",
                  height: "50px",
                  borderRadius: "10px",
                  padding: "10px",
                  marginBottom: "10px",
                }}
              />

              <textarea
                name=""
                id=""
                placeholder="Nội dung "
                style={{
                  width: "100%",
                  height: "100px",
                  borderRadius: "10px",
                  padding: "10px",
                }}
              ></textarea>
              <br />
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Blog;
