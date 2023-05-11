import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.scss";
import classNames from "classnames/bind";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";

const cx = classNames.bind(styles);
const Navbar = () => {
  const [brandApi, setBrandApi] = useState([]);

  const dataBrands = [
    {
      title: "BRANDING",
      children: brandApi,
    },
  ];

  const [brand, setBrand] = useState(false);
  const [price, setPrice] = useState(false);
  const [type, setType] = useState("");
  const [inputPrice, setInputPrice] = useState({ min: "", max: "" });

  const [_searchParams, setSearchParams] = useSearchParams();

  const hiddenBrand = () => {
    setBrand(brand === false ? true : false);
  };
  const hiddenPrice = () => {
    setPrice(price === false ? true : false);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}api/brand`)
      .then((response) => {
        setBrandApi(response.data);
      })
      .catch((error) => console.log(error));
  }, []);
  const changePrice = (e) => {
    setInputPrice((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const minPrice = inputPrice.min;
  const maxPrice = inputPrice.max;
  const handlePrice = (e) => {
    e.preventDefault();

    setSearchParams({ min: minPrice, max: maxPrice });
    axios
      .get(
        `${process.env.REACT_APP_API_KEY}api/product/sort?minPrice=${minPrice}&maxPrice=${maxPrice}`
      )
      .then((response) => {
        console.log(response.data.productData);
        
      })
      .catch((error) => console.log(error));
  };
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
      <div className={cx("branding")}>
        <button onClick={hiddenPrice} className={cx("title")}>
          Price
          {!price ? (
            <AiOutlineUp className={cx("icon-title")} />
          ) : (
            <AiOutlineDown className={cx("icon-title")} />
          )}
        </button>
        {!price ? (
          <form action="">
            <span>
              <input
                className={cx("sortprice")}
                name="min"
                type="text"
                value={inputPrice.min}
                placeholder="minPrice"
                onChange={changePrice}
              />
              <input
                className={cx("sortprice")}
                name="max"
                type="text"
                value={inputPrice.max}
                placeholder="maxPrice"
                onChange={changePrice}
              />
            </span>
            <button className={cx("filterprice")} onClick={handlePrice}>
              Filter
            </button>
          </form>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Navbar;
