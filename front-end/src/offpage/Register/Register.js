import React, { useState } from "react";
import styles from "./Register.module.scss";
import classNames from "classnames/bind";
import {
  AiFillYoutube,
  AiOutlineGithub,
  AiOutlineArrowLeft,

} from "react-icons/ai";
import { BsFillEyeSlashFill, BsFacebook } from "react-icons/bs";
import { IoEyeSharp } from "react-icons/io5";

import { Link, useNavigate } from "react-router-dom";

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
  const [input, setInput] = useState({username:'', email:'', password:''});
  const [hiddenRegister, setHiddenRegister] = useState(false);
  const [passValid, setPassValid] = useState(true);
  const [name, setName] = useState(true);
const next=useNavigate()

  const submitRegister = (e) => {
    e.preventDefault();

    // const filter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // if(!filter.test(input.email)) {
    //   alert('wrong email')
    // }
   fetch(
      "http://localhost:8080/api/v1/auth/register",
      {
        method: "POST",
        body: JSON.stringify(input),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
        if (res.ok) {
          return res.json();
        } else throw new Error("failed");
      })
      .then((data)=>{
        alert('Đăng ký thành công!')
        next('/login')
      })

    // if ( email===''|| password===''|| username==='' ) {
    //   alert('Bạn phải nhập đầy đủ username, email, password!')
    // }else{
    //   e.preventDefault();
     
    //   const data = await res.json();
    //   alert("Bạn đã đăng ký thành công!");
    //   next('/login')
    // }
  };

  const handleShowRegister = () => {
    setHiddenRegister(hiddenRegister === false ? true : false);
  };

  // const passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
  // const changeUser = (e) => {
  //   const { value } = e.target;
  //   setUserName(value);
  //   if (value.length >= 4) {
  //     setName(true);
  //   } else {
  //     setName(false);
  //   }
  // };

  // const changePass = (e) => {
  //   const { value } = e.target;
  //   setPassword(value);
  //   if ( value.length >= 8) {
  //     setPassValid(true);
  //   } else {
  //     setPassValid(false);
  //   }
  // };

  const handleInput = (e) => {
    ///value
    setInput(prevInput => ({...prevInput, [e.target.name]: e.target.value}))
    
  }

  return (
    <div className={cx('box')}>
        <div className={cx('wrapper')}>
            <div className={cx("container")}>
              <div className={cx("register")}>
                <form onSubmit={submitRegister}>
                  <h1 className={cx("big-title")}>Register hire.</h1>
                  <input
                    name="username"
                    type="text"
                    value={input.username}
                    onChange={handleInput}
                    placeholder="Name"
                  ></input>
                  {!name && (
                    <span className={cx("error")}>
                      Tên đăng nhập phải từ 4 ký tự trở lên!
                    </span>
                  )}
                  <input
                  name="email"
                    type="email"
                    value={input.email}
                    onChange={handleInput}
                    pattern=".+@gmail\.com"
                    placeholder="Email"
                  ></input>
        
                  <div className={cx("pass-show")}>
                    <input
                      name="password"
                      value={input.password}
                      type={hiddenRegister ? "text" : "password"}
                      placeholder="Password"
                      onChange={handleInput}
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
                      Mật khẩu phải đủ 8 ký tự trở lên!
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
