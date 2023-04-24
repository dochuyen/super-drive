import React from "react";
import styles from "./Checkout.module.scss";
import classNames from "classnames/bind";
import { Container, Row, Col } from "react-bootstrap";
import { AiOutlineRight,AiOutlinePlusCircle,AiOutlineMinusCircle } from "react-icons/ai";

const cx = classNames.bind(styles);
const Checkout = () => {
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
              <form>
                <div className={cx("title-form")}>Customer information</div>
                <div className={cx("name")}>
                  <div className={cx("checkout-name")}>
                    <p>
                      Fist Name
                      <span>*</span>
                    </p>
                    <input type="text" name="fist-name" />
                  </div>
                  <div className={cx("checkout-name")}>
                    <p>
                      Last Name
                      <span>*</span>
                    </p>
                    <input type="text" name="last-name" />
                  </div>
                </div>
                <div className={cx("address")}>
                  <div className={cx("checkout-input")}>
                    <p>
                      Address
                      <span>*</span>
                    </p>
                    <input type="text" name="last-name" />
                  </div>
                  <div className={cx("checkout-input")}>
                    <p>
                      Town/City
                      <span>*</span>
                    </p>
                    <input type="text" name="last-name" />
                  </div>
                  <div className={cx("checkout-input")}>
                    <p>
                      Country
                      <span>*</span>
                    </p>
                    <input type="text" name="last-name" />
                  </div>
                </div>
                <div className={cx("name")}>
                  <div className={cx("checkout-name")}>
                    <p>
                      Phone
                      <span>*</span>
                    </p>
                    <input type="text" name="fist-name" />
                  </div>
                  <div className={cx("checkout-name")}>
                    <p>
                      Email
                      <span>*</span>
                    </p>
                    <input type="text" name="last-name" />
                  </div>
                </div>
                <div className={cx("checkout-input")}>
                  <p>Order notes (option)</p>
                  <input type="text" name="last-name" />
                </div>
              </form>
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
                  <p>Lamborgini</p>
                  <div className={cx('icons-bill')}>
                    <span className={cx('plus')}><AiOutlinePlusCircle/></span>
                    1
                    <span className={cx('minus')}><AiOutlineMinusCircle/></span>
                  </div>
                  <p>$10000</p>
                </div>
              </div>
              <div className={cx("total")}>
                <p>Total</p>
                <p className={cx("total-child")}>0</p>
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
