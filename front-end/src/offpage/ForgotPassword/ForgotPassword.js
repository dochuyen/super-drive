import React, { useState } from "react";
import styles from "./ForgotPassword.module.scss";
import classNames from "classnames/bind";
import {
  AiFillYoutube,
  AiOutlineGithub,
  AiOutlineArrowLeft,
} from "react-icons/ai";
import { BsFillEyeSlashFill, BsFacebook } from "react-icons/bs";
import { IoEyeSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'

const cx = classNames.bind(styles);
const ForgotPassword = () => {
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
  // const [input, setInput] = useState({ message: "", email: "", error: "" });
  // const [hiddenRegister, setHiddenRegister] = useState(false);
  // const [passValid, setPassValid] = useState(true);

  // const next = useNavigate();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/v1/auth/forgot-password', {email});
      setMessage(response.data.message);
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  // const handleShowRegister = () => {
  //   setHiddenRegister(hiddenRegister === false ? true : false);
  // };

  // const handleInput = (e) => {
  //   const { name, value } = e.target;
  //   if (name === "password") {
  //     setPassValid(value.length >= 8);
  //   }
  //   setInput((prevInput) => ({ ...prevInput, [name]: value }));
  // };

  return (
    <div className={cx("box")}>
      <div>
      <h2>Forgot Password</h2>
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            id='email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type='submit'>Send Reset Password Link</button>
      </form>
    </div>
    </div>
  );
};

export default ForgotPassword;
