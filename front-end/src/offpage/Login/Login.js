import React, { useState } from "react";
import styles from "./Log.module.scss";
import classNames from "classnames/bind";
import {
  AiFillYoutube,
  AiOutlineGithub,
  AiOutlineArrowRight,
} from "react-icons/ai";
import { BsFillEyeSlashFill, BsFacebook } from "react-icons/bs";
import { IoEyeSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const cx = classNames.bind(styles);
const Login = () => {
  const socials = [
    {
      icon: <BsFacebook />,
      src: "https://www.facebook.com/profile.php?id=100040142041736",
    },
    {
      icon: <AiOutlineGithub />,
      src: "https://github.com/chuyenpro?tab=repositories",
    },
    {
      icon: <AiFillYoutube />,
      src: "",
    },
  ];
  const [inputLogin, setInputLogin] = useState({ email: "", password: "" });
  const [hidden, setHidden] = useState(false);
  const next = useNavigate();
  const dispatch = useDispatch();

  const submitLogin = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_KEY}/api/user/login`, {
      method: "POST",
      body: JSON.stringify(inputLogin),
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
        dispatch({ type: "SET_USERNAME", payload: data.data.username });
        dispatch({ type: "SET_CART", payload: data.data.cartitem });
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("role", data.data.role);
        if (data.data.role === "admin") {
          next("/admin");
        } else if (data.data.role === "user") {
          next("/");
        }
      })
      .catch((err) => {
        alert("Tài khoản, mật khẩu không đúng!");
      });
  };

  const handleShow = () => {
    setHidden(hidden === false ? true : false);
  };
  const handleInput = (e) => {
    ///value
    setInputLogin((prevInput) => ({
      ...prevInput,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div className={cx("box")}>
      <div className={cx("wrapper")}>
        <div className={cx("container")}>
          <div className={cx("login")}>
            <form onSubmit={submitLogin}>
              <h1 className={cx("big-title")}>Login hire.</h1>
              <input
                name="email"
                value={inputLogin.email}
                type="email"
                onChange={handleInput}
                placeholder="Email"
              ></input>
              <div className={cx("pass-show")}>
                <input
                  name={"password"}
                  value={inputLogin.password}
                  onChange={handleInput}
                  type={hidden ? "text" : "password"}
                  placeholder="Password"
                ></input>
                {hidden ? (
                  <span onClick={handleShow} className={cx("icon-show")}>
                    <BsFillEyeSlashFill />
                  </span>
                ) : (
                  <span onClick={handleShow} className={cx("icon-show")}>
                    <IoEyeSharp />
                  </span>
                )}
              </div>
              <div className={cx("content")}>
                <div className={cx("checkbox")}>
                  <input type="checkbox" name="checkbox" />
                  <label className={cx("remember")}>Remember account</label>
                </div>
                <div className={cx("pass-link")}>
                  <Link>Forgot password?</Link>
                </div>
              </div>

              <button onClick={submitLogin} className={cx("btn-login")}>
                Login
              </button>

              <span className={cx("or")}>or use your account</span>
              <div className={cx("social-box")}>
                {socials.map((social, index) => (
                  <a key={index} className={cx("social")} href={social.src}>
                    {social.icon}
                  </a>
                ))}
              </div>
            </form>
          </div>

          <div className={cx("overlay-boxlog")}>
            <div className={cx("overlay-log")}>
              <div className={cx("over-right")}>
                <h1 className={cx("title")}>
                  Start your <br /> journey now
                </h1>
                <p className={cx("text")}>
                  if you don't have an account yet, join us and start your
                  journey.
                </p>
                <Link to="/register" className={cx("ghost")}>
                  Register
                  <AiOutlineArrowRight className={cx("icon-register")} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
