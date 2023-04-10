import React, { useState, useRef, useEffect, createContext } from "react";
import styles from "./Log.module.scss";
import classNames from "classnames/bind";
import {
  AiFillYoutube,
  AiOutlineGithub,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
} from "react-icons/ai";
import { BsFillEyeSlashFill } from "react-icons/bs";
import { IoEyeSharp } from "react-icons/io5";
import { BsFacebook } from "react-icons/bs";
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

  //Register
  const [changelLog, setChangeLog] = useState(true);
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidden, setHidden] = useState(false);
  const [hiddenRegister, setHiddenRegister] = useState(false);
  const [passValid, setPassValid] = useState(true);
  const [name, setName] = useState(true);
  const input = useRef();

  const handleChange = () => {
    setChangeLog(changelLog === true ? false : true);
  };
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
      setChangeLog(true);
    }
  };
  const handleShow = () => {
    setHidden(hidden === false ? true : false);
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
    <div className={cx("box")}>
      <div className={cx("wrapper")}>
        {changelLog ? (
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
                  <button className={cx("ghost")} onClick={handleChange}>
                    Register
                    <AiOutlineArrowRight className={cx("icon-register")} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
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
                    Mật khẩu phải đủ 8 ký tự trở lên và gồm ký tự như chữ hoa,
                    ký tự đặc biệt, từ 0-9!
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
                  <button onClick={handleChange} className={cx("ghost")}>
                    Login
                    <AiOutlineArrowLeft />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
