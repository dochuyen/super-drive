import { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { RxHamburgerMenu } from "react-icons/rx";
import { BiUser, BiLogIn, BiRegistered, BiLogOut } from "react-icons/bi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaExchangeAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Offcanvas.module.scss";
import Search from "../../../components/Search/Search";

const cx = classNames.bind(styles);
function Canvas({
  localUsername,
  paserUsername,
  handleLogOut,
  lengthCartItem,
}) {
  const items = [
    {
      id: 1,
      to: "/",
      type: "Home",
    },
    {
      id: 2,
      to: "/shop",
      type: "Shop",
    },
    {
      id: 4,
      to: "/blog",
      type: "Blog",
    },

    {
      id: 5,
      to: "/contact",
      type: "Contact",
    },
  ];

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button className={cx("btn-canvas")} onClick={handleShow}>
        <RxHamburgerMenu />
      </button>
      <Offcanvas show={show} onHide={handleClose} responsive="lg">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Super Drive</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <>
            {items.map((item, index) => (
              <div key={index} className={cx("items")}>
                <Link className={cx("item")} to={item.to}>
                  {" "}
                  {item.type}
                </Link>
              </div>
            ))}
          </>
          <div className={cx("nav-search")}>{/* <Search/> */}</div>
          <div>
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
                      {paserUsername}
                    </Link>
                    <Link
                      to="/"
                      onClick={handleLogOut}
                      className={cx("btn-logout")}
                    >
                      <span>
                        <BiLogOut />
                      </span>
                      Log out
                    </Link>
                    <Link className={cx("btn-logout")} to="/change-password">
                      <span>
                        <FaExchangeAlt></FaExchangeAlt>
                      </span>
                      Log out
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className={cx("nav")}>
              <Link
                to="/checkout"
                style={{ position: "relative", cursor: "pointer" }}
              >
                <AiOutlineShoppingCart className={cx("icon-nav")} />
                {/* <div className={cx("child-icon")}>!</div> */}
              </Link>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Canvas;
