import { Container } from "react-bootstrap";
import logo from "../../assets/logo/logo.png";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaExchangeAlt } from "react-icons/fa";
import { BiUser, BiLogIn, BiRegistered, BiLogOut } from "react-icons/bi";
import { useState, useEffect } from "react";
import Canvas from "./Offcanvas/Offcanvas";
import { useSelector } from "react-redux";
import Search from "../../components/Search/Search";
import { store } from "../../store/index.js";
import { SiAdminer } from "react-icons/si";

const cx = classNames.bind(styles);
function Header() {
  const items = [
    {
      id: 1,
      to: "/",
      type: "Home",
      text: false,
    },
    {
      id: 2,
      to: "/shop",
      type: "Shop",
      text: false,
    },
    {
      id: 4,
      to: "/blog",
      type: "Blog",
      text: false,
    },

    {
      id: 5,
      to: "/contact",
      type: "Contact",
      text: false,
    },
  ];

  const [types, setTypes] = useState("Home");
  const [localUsername, setLocalUsername] = useState(false);
  const [lengthCartItem, setLengthCartItem] = useState();
  const userName = useSelector((state) => state.username);
  const cartItem = useSelector((state) => state.cart);

  useEffect(() => {
    if (!cartItem) {
      setLengthCartItem(0);
    } else {
      setLengthCartItem(cartItem.length);
    }
  }, [cartItem]);

  const clearAuthStateAction = {
    type: "CLEAR_AUTH_STATE",
  };

  useEffect(() => {
    if (!userName) {
      setLocalUsername(true);
    } else {
      setLocalUsername(false);
    }
  }, [userName]);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    store.dispatch(clearAuthStateAction);
    setLocalUsername(true);
  };
  const role = localStorage.getItem("role");
  return (
    <div
      className={cx("wrapper")}
      style={{
        top: "0",
        position: "fixed",
        zIndex: "100",
        width: "100%",
      }}
    >
      <Container>
        <div className={cx("header")}>
          <div className={cx("header-logo")}>
            <Link to="/" className={cx("logo")}>
              <image className={cx("logo-avt")} src={logo} />
            </Link>
            <Link to="/" className={cx("title")}>
              SuperDrive
            </Link>
          </div>

          <div className={cx("header-after")}>
            <div className={cx("header-item")}>
              {items.map((item) => (
                <Link
                  key={item.id}
                  to={item.to}
                  className={cx("item")}
                  style={
                    types === item.type
                      ? {
                          borderBottom: "2px solid #ff9950",
                          borderRadius: "3px",
                          color: "#ff9950",
                        }
                      : {}
                  }
                  onClick={() => {
                    setTypes(item.type);
                  }}
                >
                  {item.type}
                </Link>
              ))}
            </div>

            <div className={cx("nav-search")}>
              <Search />
            </div>

            <div className={cx("btn-log")}>
              <BiUser />

              <div className={cx("user")}>
                {localUsername ? (
                  <>
                    <Link className={cx("user-login")} to="/login">
                      <span>
                        <BiLogIn />
                      </span>
                      Login
                    </Link>
                    <Link className={cx("user-register")} to="/register">
                      <span>
                        <BiRegistered />
                      </span>
                      Register
                    </Link>
                  </>
                ) : (
                  <>
                    <Link className={cx("btn-user")}>
                      <span>
                        <BiUser />
                      </span>
                      {userName}
                    </Link>
                    <Link  to="/" onClick={handleLogOut} className={cx("btn-log")}>
                      <span>
                        <BiLogOut />
                      </span>
                      Log out
                    </Link>
                    <Link className={cx("btn-change")} to="/change-password">
                      <span>
                        <FaExchangeAlt></FaExchangeAlt>
                      </span>
                      Change Password
                    </Link>
                    <Link
                      className={cx("btn-admin")}
                      to="/admin"
                      style={{ display: role === "admin" ? "block" : "none" }}
                    >
                      <span>
                        <SiAdminer></SiAdminer>
                      </span>
                      Admin
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div
              className={cx("nav")}
              onClick={() => {
                setTypes("AiOutlineShoppingCart");
              }}
            >
              <Link
                to="/checkout"
                style={{ position: "relative", cursor: "pointer" }}
              >
                <AiOutlineShoppingCart
                  className={cx("icon-nav")}
                  style={
                    types === "AiOutlineShoppingCart" && { color: "#ff9950" }
                  }
                />
                <div className={cx("child-icon")}>{lengthCartItem}</div>
              </Link>
            </div>
          </div>
          <div className={cx("offcanvas")}>
            <div className={cx("search-offcanvas")}>
              <Search />
            </div>

            <Canvas
              localUsername={localUsername}
              paserUsername={userName}
              handleLogOut={handleLogOut}
              lengthCartItem={lengthCartItem}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Header;
