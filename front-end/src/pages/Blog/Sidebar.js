import React from 'react';
import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
const cx = classNames.bind(styles);
const Sidebar = () => {
    return (
        <div className={cx('sidebar')}>
            <div className={cx('sidebarItem')}>
                <span className={cx('sidebarTitle')}>About me</span>
                <img src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cG9ydHJhaXR8ZW58MHx8MHx8&w=1000&q=80'></img>
                <p>Customer satisfaction is our top priority, don’t hesitate to contact us using the contact form on our profile page if you require any assistance. Will try to reply within 48 hour.</p>
            </div>
            <div className={cx('sidebarItem')}>
                <span className={cx('sidebarTitle')}>CATEGORIES</span>
                <ul className={cx('sidebarListItem')}>
                    <li className={cx('sidebarListItem')}>Car</li>
                    <li className={cx('sidebarListItem')}>Lifestyle</li>
                    <li className={cx('sidebarListItem')}>Trend</li>
                    <li className={cx('sidebarListItem')}>Tutorial</li>
                    <li className={cx('sidebarListItem')}>Brand</li>
                </ul>
            </div>
            <div className={cx('sidebarItem')}>
            <div className={cx('sidebarTitle')}></div>
                <span className='sidebarSocial'>

                </span>
            </div>
        </div>
    );
};

export default Sidebar;