import React from 'react'
import classNames from 'classnames/bind'
import styles from './Layoutshop.module.scss'
import Navbar from '../component/Navbar/Navbar'
import Product from '../component/Product/Product'
import { Col, Row } from 'react-bootstrap'
import {GiHamburgerMenu} from 'react-icons/gi'

const cx=classNames.bind(styles)
const Layoutshop = () => {
  return (
   <Row>
      <div className={cx('wrapper')}>
        <Col lg={2}>
          <div className={cx('nav-bar')}>
            <Navbar/>
          </div>
        </Col>

        
        <Col lg={10}>
          <div className={cx('product')}>
            <Product/>
          </div>
        </Col>
      </div>
   </Row>
  )
}

export default Layoutshop
