import React from 'react'
import styles from './Shop.module.scss'
import classNames from 'classnames/bind'
import { Container } from 'react-bootstrap'
import {AiOutlineRight} from 'react-icons/ai'
import Layoutshop from './Layoutshop/Layoutshop'

const cx=classNames.bind(styles)
const Shop = () => {
  return (
    <div className={cx('wapper')}>
      <div className={cx('toolbar')}>
        <Container>
          <h3 className={cx('toolbar-title')}>Shop</h3>
          <div className={cx('directional')}>
            Home <AiOutlineRight className={cx('icon-tool')}/>
            <span>Shop</span>
          </div>
        </Container>
      </div>
      <Container>
        <Layoutshop/>
      </Container>
      
    </div>
  )
}

export default Shop
