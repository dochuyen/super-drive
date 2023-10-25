import React, { useState } from "react";
import styles from "./ChangePass.module.scss";
import classNames from "classnames/bind";
import {
  AiFillYoutube,
  AiOutlineGithub,
  AiOutlineArrowLeft,
} from "react-icons/ai";
import { BsFillEyeSlashFill, BsFacebook } from "react-icons/bs";
import { IoEyeSharp } from "react-icons/io5";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const cx = classNames.bind(styles);
const ChangePass= () => {
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
  const [input, setInput] = useState({ username: "", email: "", password: "" });
  const [hiddenRegister, setHiddenRegister] = useState(false);
  const [hidden, setHidden] = useState(false);

  const [passValid, setPassValid] = useState(true);

  const next = useNavigate();
  const token = localStorage.getItem("token");
  const submitRegister = (e) => {
    e.preventDefault();
    if (!input) {
      alert("Bạn phải nhập đủ thông tin");
    } else {
      const fetchData = async () => {
        try {
          await axios.put(
            `${process.env.REACT_APP_API_KEY}/api/user/change-password`,
            {
              currentPassword: input.email,
              newPassword: input.password,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          alert("Đổi mật khẩu thành công!");
          next("/login");
        } catch (error) {
          console.log(error);
          alert("Mật khẩu cũ không đúng!");
        }
      };

      fetchData();
    }
  };

  const handleShowRegister = () => {
    setHiddenRegister(hiddenRegister === false ? true : false);
  };
  const handleHidden = () => {
    setHidden(hidden === false ? true : false);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === "password") {
      setPassValid(value.length >= 8);
    }
    setInput((prevInput) => ({ ...prevInput, [name]: value }));
  };

  return (
    <div className={cx("box")}>
      <div className={cx("wrapper")}>
        <div className={cx("container")}>
          <div className={cx("register")}>
            <form onSubmit={submitRegister}>
              <h1 className={cx("big-title")}>Change Password</h1>
            
              <input
                name="email"
             
                value={input.email}
                onChange={handleInput}
                type={hiddenRegister ? "text" : "password"}
                placeholder="Old Password"
              ></input>

              <div className={cx("pass-show")}>
                <input
                  name="password"
                  value={input.password}
                  type={hiddenRegister ? "text" : "password"}
                  placeholder="New Password"
                  onChange={handleInput}
                ></input>
                {hiddenRegister ? (
                  <span
                    onClick={handleShowRegister}
                    className={cx("icon-show")}
                  >
                    <BsFillEyeSlashFill />
                  </span>
                ) : (
                  <span
                    onClick={handleShowRegister}
                    className={cx("icon-show")}
                  >
                    <IoEyeSharp />
                  </span>
                )}
              </div>

              {!passValid ? (
                <span className={cx("error")}>
                  Mật khẩu phải đủ 8 ký tự trở lên!
                </span>
              ) : (
                <></>
              )}

              <div className={cx("pass-show")}>
                <input
                  name="username"
                  value={input.username}
                  type={hiddenRegister ? "text" : "password"}
                  placeholder="Confirm New Password"
                  onChange={handleInput}
                ></input>
                {hidden ? (
                  <span
                    onClick={handleHidden}
                    className={cx("icon-show")}
                  >
                    <BsFillEyeSlashFill />
                  </span>
                ) : (
                  <span
                    onClick={handleHidden}
                    className={cx("icon-show")}
                  >
                    <IoEyeSharp />
                  </span>
                )}
              </div>

              {!(input.password===input.username) ? (
                <span className={cx("error")}>
                Vui lòng nhập đúng mật khẩu mới tạo!
                </span>
              ) : (
                <></>
              )}

              <button type="submit" className={cx("btn-register")}>
                Change Password
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
                <Link to="/" className={cx("ghost")}>
                  Home
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

export default ChangePass;
