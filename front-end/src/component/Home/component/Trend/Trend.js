import React from "react";
import classNames from "classnames/bind";
import styles from "./Trend.module.scss";
import { AiOutlineCalendar } from "react-icons/ai";
import gifFerrari from '../../../../accets/gif/trend1.gif'
import gifGtr from '../../../../accets/gif/gtr-trend.gif'
import gifLamborghini from '../../../../accets/gif/lambogini-trend.gif'


const cx = classNames.bind(styles);
const Trend = () => {
  const dataGif=[
    {
      src:gifFerrari,
      name:'Ferrari'
    },
    {
      src:gifGtr,
      name:'Gtr'
    },
    {
      src:gifLamborghini,
      name:'Lamborghini'
    },
  ]

  return (
    <div className={cx("wrapper")}>
      <div className={cx("title")}>
        <h5 className={cx("small-title")}>LATEST NEWS</h5>
        <h2 className={cx("big-title")}>New Trends</h2>
      </div>
      <div className={cx('box')}>
          {dataGif.map((gif, index)=>(
            <div className={cx('content')}>
            <div className={cx("gif")} style={{backgroundImage: `url(${gif.src})`}}></div>
            <div className={cx("type")}>
              <p className={cx("calendar")}>
                <AiOutlineCalendar  className={cx('icon-calendar')}/>
                24/03/2023
              </p>
              <p className={cx("title-ctt")}>{gif.name}</p>
            </div>
        </div>
          ))}
      </div>
    </div>
  );
};

export default Trend;
