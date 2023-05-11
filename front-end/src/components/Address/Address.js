import React from "react";
import styles from "./Address.module.scss";
import className from "classnames/bind";


const cx = className.bind(styles);
const Address = ({ inputAddress, changeAddres }) => {
  return (
    <>
      <form>
        <div className={cx("title-form")}>Customer information</div>

        <div className={cx("address")}>
          <div className={cx("checkout-input")}>
            <p>
              Address
              <span>*</span>
            </p>
            <input
              value={inputAddress.address}
              onChange={changeAddres}
              type="text"
              name="address"
            />
          </div>
          <div className={cx("checkout-input")}>
            <p>
              Town/City
              <span>*</span>
            </p>
            <input
              value={inputAddress.city}
              onChange={changeAddres}
              type="text"
              name="city"
            />
          </div>
          <div className={cx("checkout-input")}>
            <p>
              Country
              <span>*</span>
            </p>
            <input
              value={inputAddress.country}
              onChange={changeAddres}
              type="text"
              name="country"
            />
          </div>
        </div>

        <div className={cx("checkout-input")}>
          <p>
            Phone
            <span>*</span>
          </p>
          <input
            value={inputAddress.phone}
            onChange={changeAddres}
            type="text"
            name="phone"
          />
        </div>

        <div className={cx("checkout-input")}>
          <p>Order notes (option)</p>
          <input
            value={inputAddress.notes}
            onChange={changeAddres}
            type="text"
            name="notes"
          />
        </div>
      </form>
    </>
  );
};

export default Address;
