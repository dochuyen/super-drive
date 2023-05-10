import React from 'react';
import classNames from "classnames/bind";
import styles from "./BlogHeader.module.scss";
import { AiOutlineRight } from "react-icons/ai";
const cx = classNames.bind(styles);
const BlogHeader = () => {
    return (
        <div className={cx("header")}>
        <div className={cx('headerTitles')}>
            <span className={cx('headerTitleSm')}>Home 
            <AiOutlineRight className={cx("icon-tool")} />
             Blog</span>
            
        </div>
           <img className={cx('headerImg')} src='https://www.supercars.net/blog/wp-content/uploads/2020/09/wallpaperflare.com_wallpaper-1-1.jpg'></img>

        </div>
    );
};

export default BlogHeader;