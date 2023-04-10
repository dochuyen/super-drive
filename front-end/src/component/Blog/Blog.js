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

const cx = classNames.bind(styles);
const Blog = () => {
  const cardDatas = [
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
  ];
  const blogData = [
    {
      title: "Blog 1",
      discriptions: "bài 1",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSku11THyazq5qxc17AmBnusnk9dY7nPyiB2Q&usqp=CAU",
    },
  ];
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    centerPadding: '200px',
    slidesToScroll: 1,
    autoplay: true,
    autoplayspeed: 1000,
    responsive: [
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2,
        },
      },

      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };
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
            position: "relative",
            top: -120,
          }}
        >
          <Slider {...settings}>
            {cardDatas.map((cardData, index) => (
              <div className={cx("slider-box")} key={index}>
                
                <div>
                  <h1>lambogifi</h1>
                </div>
              </div>
            ))}
          </Slider>
        </Row>
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
          <Col xs={12} md={6} lg={4} className={cx("blog")}>
            <Card style={{ width: "100%", marginTop: "20px" }}>
              <Card.Img
                variant="top"
                width="100px"
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
          <Col xs={12} md={6} lg={4} className={cx("blog")}>
            <Card style={{ width: "100%", marginTop: "20px" }}>
              <Card.Img
                variant="top"
                width="100px"
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
          <h1>Comment</h1>

          <Col md={{ span: 6, offset: 3 }}>
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
