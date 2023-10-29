import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import Button from "react-bootstrap/Button";
import classNames from "classnames/bind";
import styles from "./Contact.module.scss";
import ContactForm from "./ContactForm/ContactForm";

const cx = classNames.bind(styles);
const Contact = () => {
  const dataList = [
    {
      id: 1,
      img: "https://static.automotor.vn/images/upload/2022/08/28/bugatti-chay-hang-autonews.jpeg",
      title: "Bugatti",
      content:
        "Bugatti là dòng siêu xe hạng cao hoàn toàn mới của hãng siêu xe Bugatti,Pháp.",
    },
    {
      id: 2,
      img: "https://xehay.vn/uploads/images/2015/08/4/xehay-10sieuxe-240815-1.jpg",
      title: "Ferrari",
      content:
        "Ferrari là dòng xe thể thao đường dài động cơ đặt giữa và dẫn động cầu sau của nhà sản xuất xe hơi Ferrari, Ý.",
    },
    {
      id: 3,
      img: "https://asb.vn/wp-content/uploads/2021/03/top-sieu-xe-lam-nen-ten-tuoi-tren-thi-truong-chau-my-1.jpg",
      title: "Lamborghini",
      content:
        "Automobili Lamborghini S.p.A là nhà sản xuất siêu xe thể thao cao cấp của Italy",
    },
  ];
  return (
    <div className={cx("wrapper")}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.3391816052476!2d105.7834574153847!3d20.97903669484882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135accd88c1276b%3A0xc7ec85c744d8874e!2zSOG7kyBHxrDGoW0gUGxhemE!5e0!3m2!1svi!2s!4v1679021566383!5m2!1svi!2s"
        width="100%"
        height="450"
        title="map"
        style={{
          border: "1px  blue solid  ",
          margin: " 20px 0",
          borderRadius: "5px",
        }}
        loading="lazy"
      />
      <Container>
        <Row className={cx("figure")}>
          <h1>Contatti & Info</h1>

          <Col
            xs={12}
            md={7}
            style={{
              border: "none",
              alignItems: "center",
            }}
          >
            <Card style={{ margin: "0 5%" }} className={cx("card-prev")}>
              <Card.Body>
                <h3>Info & Cars</h3>
                <p>
                  Chào mừng quý khách đến với chúng tôi! Chúng tôi đang cung cấp
                  những dòng xe ô tô sang trọng và đẳng cấp, đáp ứng nhu cầu di
                  chuyển của quý khách hàng.
                </p>
              </Card.Body>
            </Card>
            <br />
            <Card style={{ margin: "0 5%" }} className={cx("card-prev")}>
              <Card.Body>
                <h3>Location</h3>
                <p> 500 Terry Francois Street San Francisco, CA 94158</p>
                <p>Phone: 123 - 456 - 7890</p>
                <p> Email: info@mysite.com</p>
              </Card.Body>
            </Card>
          </Col>
          <Col
            xs={12}
            md={5}
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <Card className={cx("card-support")}>
              <Card.Header style={{ background: "violet" }} as="h3">
                Support team
              </Card.Header>
              <Card.Body>
                <p> Phone: 123 - 456 - 7890</p>
                <p>Email: info@mysite.com</p>
                <Button variant="primary">Contact</Button>
              </Card.Body>
            </Card>

            <ContactForm />
          </Col>
        </Row>
        <Row xs={1} md={1} lg={1}>
          <Card
            style={{
              border: "none",
              alignItems: "center",
            }}
          >
            <Card.Body>
              <Card.Title>Perchè partire con Surfcamp?</Card.Title>
            </Card.Body>
            <CardGroup style={{ justifyContent: "space-evenly" }}>
              {dataList.map((item) => (
                <Card
                  key={item.id}
                  style={{
                    width: "18rem",
                    border: "none",
                    textAlign: "center",
                    alignItems: "center",
                  }}
                >
                  <Card.Img
                    style={{
                      width: "190px",
                      height: "190px",
                      borderRadius: "50%",
                    }}
                    variant="bottom"
                    src={item.img}
                  />
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>{item.content}</Card.Text>
                  </Card.Body>
                </Card>
              ))}
            </CardGroup>
          </Card>
        </Row>
      </Container>
    </div>
  );
};

export default Contact;
