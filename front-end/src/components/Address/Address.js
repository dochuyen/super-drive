import React, { useState } from "react";
import styles from "./Address.module.scss";
import className from "classnames/bind";
import { useSelector } from "react-redux";

const cx = className.bind(styles);
const Address = () => {
  const [inputAddress, setInputAddress] = useState({
    address:'',
    city: "",
    country: "",
    phone: "",
    notes: "",
  });
  const emailUser = useSelector((state) => state.email);
 const submitAddress = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8080/api/address/add/${emailUser}`, {
      method: "PUT",
      body: JSON.stringify(inputAddress),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else throw new Error("failed");
      })
      .then((data) => {
        alert("Thêm địa chỉ thành công!")
        console.log(data);
      })
      .catch(err=>{
        alert("Khong thành công!")
      })
  };
  const changeAddres=(e)=>{
    setInputAddress((prevInput)=>({
        ...prevInput,
        [e.target.name]:e.target.value
    }))
  }

  return (
   <>
        <form action={submitAddress}>
          <div className={cx("title-form")}>Customer information</div>
    
          <div className={cx("address")}>
            <div className={cx("checkout-input")}>
              <p>
                Address
                <span>*</span>
              </p>
              <input value={inputAddress.address} onChange={changeAddres} type="text" name="address" />
            </div>
            <div className={cx("checkout-input")}>
              <p>
                Town/City
                <span>*</span>
              </p>
              <input value={inputAddress.city} onChange={changeAddres} type="text" name="city" />
            </div>
            <div className={cx("checkout-input")}>
              <p>
                Country
                <span>*</span>
              </p>
              <input value={inputAddress.country} onChange={changeAddres} type="text" name="country" />
            </div>
          </div>
    
          <div className={cx("checkout-input")}>
            <p>
              Phone
              <span>*</span>
            </p>
            <input value={inputAddress.phone} onChange={changeAddres} type="text" name="phone" />
          </div>
    
          <div className={cx("checkout-input")}>
            <p>Order notes (option)</p>
            <input value={inputAddress.notes} onChange={changeAddres} type="text" name="notes" />
          </div>
        </form>
        <button onClick={submitAddress}>
            submitAddress
        </button>
   </>
  );
};

export default Address;
