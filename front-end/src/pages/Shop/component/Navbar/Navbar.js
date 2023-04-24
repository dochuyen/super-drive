import React, { useState } from "react";
import styles from "./Navbar.module.scss";
import classNames from "classnames/bind";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";

const cx = classNames.bind(styles);
const Navbar = () => {
  const dataBrands = [
    {
      title: "BRANDING",
      children: [
        {
          type: "BMW",
        },
        {
          type: "FERRARI",
        },
        {
          type: "AUDI",
        },
      ],
    },
  ];

  const dataPrices = [
    {
      title: "PRICE",
      children: [
        {
          type: "$10000-$20000",
        },
        {
          type: "$20000-$30000",
        },
        {
          type: "$30000-$40000",
        },
      ],
    },
  ];
  const [brand, setBrand] = useState(false);
  const [price, setPrice] = useState(false);
  const [type, setType] = useState("BMW");

  const hiddenBrand=()=>{
    setBrand(brand===false?true:false)
  }
  const hiddenPrice=()=>{
    setPrice(price===false?true:false)
  }
  return (
    <div className={cx("wrapper")}>
      {dataBrands.map((dataBrand, index) => (
        <div key={index} className={cx("branding")}>
          <button onClick={hiddenBrand} className={cx("title")} key={index}>
            {dataBrand.title} {!brand?(<AiOutlineUp className={cx("icon-title")} />):<AiOutlineDown className={cx("icon-title")} />}
          </button>
          {!brand ?(<div className={cx("items-brand")}>
            <ul>
              {dataBrand.children.map((chid, index) => (
                <li
                  key={index}
                  style={
                    type === chid.type
                      ? {
                          color: "#000",
                          fontWeight: "500",
                        }
                      : {}
                  }
                  onClick={() => setType(chid.type)}
                  className={cx("item")}
                >
                  {chid.type}
                </li>
              ))}
            </ul>
          </div>):(<></>)}
        </div>
      ))}
      {dataPrices.map((dataPrice, index) => (
        <div key={index} className={cx("branding")}>
          <button onClick={hiddenPrice} className={cx("title")}>
            {dataPrice.title} {!price?(<AiOutlineUp className={cx("icon-title")} />):<AiOutlineDown className={cx("icon-title")} />}
          </button>
          {!price?(<div className={cx("items-brand")}>
            <ul>
              {dataPrice.children.map((chid, index) => (
                <li
                  key={index}
                  style={
                    type === chid.type
                      ? {
                          color: "#000",
                          fontWeight: "500",
                        }
                      : {}
                  }
                  onClick={() => setType(chid.type)}
                  className={cx("item")}
                >
                  {chid.type}
                </li>
              ))}
            </ul>
          </div>):(<></>)}
        </div>
      ))}
    </div>
  );
};

export default Navbar;
