import React, { useState, useRef } from "react";
import styles from "./Register.module.scss";
import classNames from "classnames/bind";
import {
  AiFillYoutube,
  AiOutlineGithub,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
} from "react-icons/ai";
import { BsFillEyeSlashFill, BsFacebook } from "react-icons/bs";
import { IoEyeSharp } from "react-icons/io5";

import { Link } from "react-router-dom";

const cx = classNames.bind(styles);
const Register = () => {
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
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hiddenRegister, setHiddenRegister] = useState(false);
  const [passValid, setPassValid] = useState(true);
  const [name, setName] = useState(true);
  const input = useRef();

  const submitRegister = async (e) => {
    if ({ email, password, username }) {
      e.preventDefault();
      const res = await fetch(
        "https://63fb4ba12027a45d8d63d560.mockapi.io/account",
        {
          method: "POST",
          body: JSON.stringify({ username, email, password }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      input.current.focus();
      alert("Bạn đã đăng ký thành công, mời bạn đăng nhập!");
      
    }
  };

  const handleShowRegister = () => {
    setHiddenRegister(hiddenRegister === false ? true : false);
  };

  const passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
  const changeUser = (e) => {
    const { value } = e.target;
    setUserName(value);
    if (value.length >= 4) {
      setName(true);
    } else {
      setName(false);
    }
  };

  const changePass = (e) => {
    const { value } = e.target;
    setPassword(value);
    if (value.match(passw) && value.length >= 8) {
      setPassValid(true);
    } else {
      setPassValid(false);
    }
  };
  return (
    <div className={cx('box')}>
        <div className={cx('wrapper')}>
            <div className={cx("container")}>
              <div className={cx("register")}>
                <form onSubmit={submitRegister}>
                  <h1 className={cx("big-title")}>Register hire.</h1>
                  <input
                    type="text"
                    ref={input}
                    value={username}
                    onChange={changeUser}
                    placeholder="Name"
                  ></input>
                  {!name && (
                    <span className={cx("error")}>
                      Tên đăng nhập phải từ 4 ký tự trở lên!
                    </span>
                  )}
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    pattern=".+@gmail\.com"
                    placeholder="Email"
                  ></input>
        
                  <div className={cx("pass-show")}>
                    <input
                      value={password}
                      type={hiddenRegister ? "text" : "password"}
                      placeholder="Password"
                      onChange={changePass}
                    ></input>
                    {hiddenRegister ? (
                      <span onClick={handleShowRegister} className={cx("icon-show")}>
                        <BsFillEyeSlashFill />
                      </span>
                    ) : (
                      <span onClick={handleShowRegister} className={cx("icon-show")}>
                        <IoEyeSharp />
                      </span>
                    )}
                  </div>
                  {!passValid ? (
                    <span className={cx("error")}>
                      Mật khẩu phải đủ 8 ký tự trở lên và gồm ký tự như chữ hoa, ký tự
                      đặc biệt, từ 0-9!
                    </span>
                  ) : (
                    <></>
                  )}
        
                  <button type="submit" className={cx("btn-register")}>
                    Register
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
              <div className={cx("overlay-boxreg")}>
                <div className={cx("overlay-reg")}>
                  <div className={cx("over-left")}>
                    <h1 className={cx("title")}>
                      Hello <br /> friends
                    </h1>
                    <p className={cx("text")}>
                      if you have an account, login here and have fun
                    </p>
                    <Link to='/login' className={cx("ghost")}>
                      Login
                      <AiOutlineArrowLeft />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
        </div>
    </div>
  );
};

export default Register;
