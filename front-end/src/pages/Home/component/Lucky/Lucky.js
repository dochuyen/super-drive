import React, { useState } from "react";
import styles from "./Lucky.module.scss";
import classNames from "classnames/bind";
import picturelucky from "../../../../assets/lucky/lamborgini-lucky.jpg";
import {useNavigate} from 'react-router-dom'


const cx = classNames.bind(styles);
const Lucky = () => {
  const giftS = [
    {
      hidden: true,
      img: "https://ms-prd-nna.use.mediaserver.heliosnissan.net/iris/iris?resp=png&bkgnd=transparent&pov=E31&w=8667&h=8667&x=797&y=222&height=326&width=578&vehicle=8_L34&paint=KCH&fabric=G&brand=nisnna&sa=1_B,2_DB,4_A,5_L,6_D,7_Z,11_D,12_U,13_A,SHADOW_ON,PI_ON,PE_ON,2023",
    },
    {
      hidden: true,

      img: "https://ms-prd-nna.use.mediaserver.heliosnissan.net/iris/iris?resp=png&bkgnd=transparent&pov=E31&w=8667&h=8667&x=797&y=222&height=326&width=578&vehicle=8_Z34&paint=KAD&fabric=G&brand=nisnna&sa=1_G,2_LV,4_A,5_L,6_Q,7_Y,11_Z,12_U,13_A,SHADOW_ON,PI_ON,PE_ON,2023",
    },
    {
      type: "Wish you luck next time!",
      hidden: false,
    },
    {
      type: "Wish you luck next time!",
      hidden: false,
    },
    {
      type: "Wish you luck next time!",
      hidden: false,
    },
    {
      img: "https://ms-prd-nna.use.mediaserver.heliosnissan.net/iris/iris?resp=png&bkgnd=transparent&pov=E31&w=8667&h=8667&x=797&y=222&height=326&width=578&vehicle=8_R35&paint=QAB&fabric=G&brand=nisnna&sa=1_G,2_LR,4_N,5_L,6_Y,7_3,11_Z,12_U,13_A,SHADOW_ON,PI_ON,PE_ON,2023",
      hidden: true,
    },
    {
      type: "Wish you luck next time!",
      hidden: false,
    },
  ];
  const [random, setRandom] = useState(giftS);
  const [isClicked, setIsClicked] = useState(false);
  const token=localStorage.getItem("token")
  const next =useNavigate()

  const handleRandom = () => {
    if(token){
      const randomGift = Math.floor(Math.random() * giftS.length);
    setRandom(giftS[randomGift]);
    setIsClicked(true);
    }else{
      alert('Bạn phải đăng nhập!')
      next('/login')
    }

    
  };
  return (
    
      <div className={cx("wrapper")}>
        <img className={cx("picture")} src={picturelucky}></img>
        <div className={cx("interact")}></div>

          <div className={cx("content")}>
            <h1 className={cx("title")}>LUCKY GIFT</h1>
            <p className={cx("text")}>Randomly a surprise will come to you</p>
            <div className={cx("btn")}>
              <button
                className={cx("btn-click")}
                disabled={isClicked}
                onClick={handleRandom}
              >
                Click random!
              </button>
            </div>
    
            <div className={cx("result")}>
              {random.hidden && (
                <img className={cx("img-random")} src={random.img} />
              )}
              <p className={cx("text-random")}>{random.type}</p>
            </div>
          </div>
 
      </div>
  );
};

export default Lucky;
