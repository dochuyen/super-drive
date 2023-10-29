import React from "react";
import styles from "./Footer.module.scss";
import classNames from "classnames/bind";
import { Container } from "react-bootstrap";
import {
    AiFillFacebook,
  AiFillYoutube,
  AiOutlineGithub
} from "react-icons/ai";
import "tippy.js/dist/tippy.css";


const cx = classNames.bind(styles);
const Footer = () => {
  const datas = [
    {
      title: "SUPER DRIVER AT HOME",
      children: [
        {
          type: "Get Started",
        },
        {
          type: "All Vehicles",
        },
        {
          type: "Build Your Car",
        },
        {
          type: "Search Inventory",
        },
      ],
    },
    {
      title: "SHOP",
      children: [
        {
          type: "Buy",
        },
        {
          type: "Check out",
        },
        {
          type: "Shop cart",
        },
      ],
    },
    {
      title: "ABOUT",
      children: [
        {
          type: "About Supper Driver",
        },
        {
          type: "News & Events",
        },
        {
          type: "Cookie Settings",
        },
      ],
    },
  ];
  const socials = [
    {
      icon: <AiFillFacebook />,
      src:'https://www.facebook.com/profile.php?id=100040142041736'
    },
    {
      icon: <AiOutlineGithub />,
      src:'https://github.com/chuyenpro?tab=repositories'
    },
    {
      icon: <AiFillYoutube />,
    },
  ];
  return (
    <div className={cx("footer")}>
      <Container>
        <div className={cx("wrapper")}>
          <div className={cx("menu")}>
            {datas.map((data, index) => (
              <div key={index} className={cx("list")}>
                <strong>{data.title}</strong>
                <ul>
                  {data.children.map((chil, index) => (
                    <li key={index} className={cx("item")}>{chil.type}</li>
                  ))}
                </ul>
              </div>
            ))}

  
          <div className={cx("social")}>
            <div className={cx("icons")}>
              {socials.map((social, index) => (
                <a key={index} href={social.src}  className={cx("icon")}>{social.icon}</a>
              ))}
            </div>
            
              <span>@SUPER DRIVER</span>
          </div>
          </div>

        </div>
      </Container>
    </div>
  );
};

export default Footer;
