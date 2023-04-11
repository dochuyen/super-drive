import React, { useState, useRef, useEffect, createContext } from "react";
import styles from "./Log.module.scss";
import classNames from "classnames/bind";
import {
  AiFillYoutube,
  AiOutlineGithub,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
} from "react-icons/ai";
import { BsFillEyeSlashFill,BsFacebook } from "react-icons/bs";
import { IoEyeSharp } from "react-icons/io5";

import axios from "axios";
import { Link } from "react-router-dom";

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

  //Login
  const [login, setLogin] = useState([]);
  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const [linkLogin, setLinkLogin] = useState(false);
  const [localAccount, setLocalAccount]=useState([])
  const [hidden, setHidden] = useState(false);

  localStorage.getItem('localAccount')
  const validUser = login.find(
    (user) => user.email === emailLogin && user.password === passwordLogin
  );
  useEffect(() => {
    fetch("https://63fb4ba12027a45d8d63d560.mockapi.io/account")
      .then((res) => res.json())
      .then((data) => {
        setLogin(data);
      });
  }, []);
  useEffect(() => {
    if (validUser) {
      setLinkLogin(true);
    } else {
      setLinkLogin(false)
    }
  }, [emailLogin && passwordLogin]);
  const pushLocal=()=>{
      localAccount.push(validUser.id)
      localStorage.setItem('validUser', JSON.stringify(validUser.username))
      console.log(localAccount.id)
  }

  const handleShow = () => {
    setHidden(hidden === false ? true : false);
  };
  
  return (
    <div className={cx("box")}>
      <div className={cx("wrapper")}>
          <div className={cx("container")}>
            <div className={cx("login")}>
              <form>
                <h1 className={cx("big-title")}>Login hire.</h1>
                <input
                  value={emailLogin}
                  type="email"
                  onChange={(e) => setEmailLogin(e.target.value)}
                  placeholder="Email"
                ></input>
                <div className={cx("pass-show")}>
                  <input
                    value={passwordLogin}
                    onChange={(e) => setPasswordLogin(e.target.value)}
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
                    <a href="#">Forgot password?</a>
                  </div>
                </div>
                {!linkLogin ? (
                  <Link className={cx("btn-login")}>Login</Link>
                ) : (
                  <Link onClick={pushLocal} to="/" className={cx("btn-login")}>
                    Login
                  </Link>
                )}
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
                  <Link to='/register' className={cx("ghost")}>
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
