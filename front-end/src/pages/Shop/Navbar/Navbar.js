import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.scss";
import classNames from "classnames/bind";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import axios from "axios";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);
const Navbar = () => {
  const [brandApi, setBrandApi] = useState([]);

  const dataBrands = [
    {
      title: "BRANDING",
      children: brandApi,
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
  const [type, setType] = useState("");

  const hiddenBrand = () => {
    setBrand(brand === false ? true : false);
  };
  const hiddenPrice = () => {
    setPrice(price === false ? true : false);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/brand")
      .then((response) => {
        setBrandApi(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className={cx("wrapper")}>
      {dataBrands.map((dataBrand, index) => (
        <div key={index} className={cx("branding")}>
          <button onClick={hiddenBrand} className={cx("title")} key={index}>
            {dataBrand.title}{" "}
            {!brand ? (
              <AiOutlineUp className={cx("icon-title")} />
            ) : (
              <AiOutlineDown className={cx("icon-title")} />
            )}
          </button>
          {!brand ? (
            <div className={cx("items-brand")}>
              <ul>
                {dataBrand.children.map((child, index) => (
                  <Link to={"/shop/" + child._id} key={index}>
                    <li
                      style={
                        type === child.name
                          ? {
                              color: "#000",
                              fontWeight: "500",
                            }
                          : {}
                      }
                      onClick={() => setType(child.name)}
                      className={cx("item")}
                    >
                      {child.name}
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          ) : (
            <></>
          )}
        </div>
      ))}
      {dataPrices.map((dataPrice, index) => (
        <div key={index} className={cx("branding")}>
          <button onClick={hiddenPrice} className={cx("title")}>
            {dataPrice.title}{" "}
            {!price ? (
              <AiOutlineUp className={cx("icon-title")} />
            ) : (
              <AiOutlineDown className={cx("icon-title")} />
            )}
          </button>
          {!price ? (
            <div className={cx("items-brand")}>
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
            </div>
          ) : (
            <></>
          )}
        </div>
      ))}
    </div>
  );
};

export default Navbar;
