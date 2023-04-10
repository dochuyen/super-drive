import React from 'react'
import classNames from 'classnames/bind'
import styles from './Layoutshop.module.scss'
import Navbar from '../component/Navbar/Navbar'
import Product from '../component/Product/Product'

const cx=classNames.bind(styles)
const Layoutshop = () => {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('nav-bar')}>
        <Navbar/>
      </div>
      <div className={cx('product')}>
        <Product/>
      </div>
    </div>
  )
}

export default Layoutshop
