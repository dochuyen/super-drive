import { React, useEffect, useState } from "react";
import styles from "./Checkout.module.scss";
import classNames from "classnames/bind";
import { Container, Row } from "react-bootstrap";
import { AiOutlineRight, AiOutlineCloseCircle } from "react-icons/ai";
import axios from "axios";
import { useDispatch } from "react-redux";
import Address from "../../../components/Address/Address";

const cx = classNames.bind(styles);
const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");

  const total = cartItems.reduce(
    (item, crr) => item + crr.price * crr.quantity,
    0
  );

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}/api/cart/get`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCartItems(response.data.data.cartitem);
        // dispatch({type:'SET_CART', payload:response.data.data.cartitem});
      })
      .catch((error) => console.log(error));
  }, []);

  const handleRemoveFromCart = (cart) => {
    const deleteCart = async () => {
      try {
        await axios.delete(
          `${process.env.REACT_APP_API_KEY}/api/cart/delete/${cart.productId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        //redux dispatch
        const updatedCartItems = cartItems.filter(
          (item) => item.productId !== cart.productId
        );
        setCartItems(updatedCartItems);
        dispatch({ type: "SET_CART", payload: updatedCartItems });
      } catch (error) {
        console.log(error);
      }
    };
    deleteCart();
  };
  const [inputAddress, setInputAddress] = useState({
    address: "",
    city: "",
    country: "",
    phone: "",
    notes: "",
  });
  const submitAddress = (e) => {
    e.preventDefault();
    if (
      !inputAddress.address ||
      !inputAddress.city ||
      !inputAddress.country ||
      !inputAddress.phone
    ) {
      alert("Vui lòng điền thông tin nhận hàng đầy đủ !");
    } else {
      fetch(`${process.env.REACT_APP_API_KEY}/api/address/add`, {
        method: "PUT",
        body: JSON.stringify(inputAddress),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else throw new Error("failed");
        })
        .then((data) => {
          alert("Đặt hàng thành công!");
          console.log(data);
        })
        .catch((err) => {
          alert("Đặt hàng chưa thành công!");
        });
    }
  };
  const changeAddres = (e) => {
    setInputAddress((prevInput) => ({
      ...prevInput,
      [e.target.name]: e.target.value,
    }));
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
              <Address
                inputAddress={inputAddress}
                changeAddres={changeAddres}
              />
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
              <button className={cx("btn-submit")} onClick={submitAddress}>
                PLACE ORDER
              </button>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default Checkout;
