import { React, useEffect, useState } from "react";
import styles from "./Checkout.module.scss";
import classNames from "classnames/bind";
import { Container, Row } from "react-bootstrap";
import { AiOutlineRight, AiOutlineCloseCircle } from "react-icons/ai";
import axios from "axios";
import { useSelector } from "react-redux";
import Address from "../../../components/Address/Address";

const cx = classNames.bind(styles);
const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const userEmail = useSelector((state) => state.email);
  const total = cartItems.reduce(
    (item, crr) => item + crr.price * crr.quantity,
    0
  );

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/cart/get/${userEmail}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setCartItems(response.data.data.cartitem);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleRemoveFromCart = (cart) => {
    const deleteCart = async () => {
      try {
        await axios.delete(
          `http://localhost:8080/api/cart/delete/${userEmail}/${cart.productId}`
        );
        const updatedCartItems = cartItems.filter(
          (item) => item.productId !== cart.productId
        );
        setCartItems(updatedCartItems);
      } catch (error) {
        console.log(error);
      }
    };
    deleteCart();
  };
  return (
    <div className={cx("wapper")}>
      <div className={cx("toolbar")}>
        <Container>
          <h3 className={cx("toolbar-title")}>Checkout</h3>
          <div className={cx("directional")}>
            <div>
              Home <AiOutlineRight className={cx("icon-tool")} />
            </div>
            <div>
              Buy <AiOutlineRight className={cx("icon-tool")} />
            </div>
            <div className={cx("end")}>Checkout</div>
          </div>
        </Container>
      </div>
      <Container>
        <Row>
          <div className={cx("content")}>
            <div className={cx("info-user")}>
              <Address />
            </div>

            <div className={cx("bill")}>
              <h4 className={cx("bill-title")}>Your order</h4>
              <div className={cx("bill-order")}>
                <div className={cx("title-order")}>
                  <div className={cx("name-product")}>
                    <p>Product</p>
                  </div>

                  <div className={cx("price")}>
                    <p>Price</p>
                  </div>
                </div>
                <div className={cx("list-bill")}>
                  {cartItems.map((cart) => (
                    <div className={cx("list-item")} key={cart.productId}>
                      <p>{cart.title}</p>
                      <div className={cx("icons-bill")}>
                        <span
                          onClick={() => handleRemoveFromCart(cart)}
                          className={cx("plus")}
                        >
                          <AiOutlineCloseCircle />
                        </span>
                      </div>
                      <p>${cart.price}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className={cx("total")}>
                <p>Total</p>
                <p className={cx("total-child")}>${total}</p>
              </div>
              <div className={cx("check")}>
                <input type="checkbox" name="" value="" />
                Pay on receipt
              </div>
              <div className={cx("check")}>
                <input type="checkbox" name="" value="" />
                <span>Paypal</span>
              </div>
              <button className={cx("btn-submit")}>PLACE ORDER</button>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default Checkout;