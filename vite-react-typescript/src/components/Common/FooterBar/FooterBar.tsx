/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-19 15:18 (GMT+0900)
 */
import React, { useState } from 'react'
import OrderList from "@/components/Common/OrderList/OrderList";
import './FooterBar.scss'
import {Link} from 'react-router-dom'
import {IconArrow, IconFood} from "@/components/Common/Icons";

export default function FooterBar() {
  const [listVisible, setListVisible] = useState(false)

  function handleClick(): void {
    setListVisible(!listVisible)
  }

  return (
    <>
      <dl className={`footer-bar bg-primary shadow`} onClick={handleClick}>
        <dd className="shopping-cart flex-center fs20">
          <IconFood className="mr4 mb4"/>
          <h2>89</h2>
        </dd>
        <dd className="pl10 color-white">
          <span className="small-text">¥</span> 900
        </dd>
        <Link to="/confirm" className={'flex-center btn-confirm'}>
          确定
          <IconArrow/>
        </Link>
      </dl>
      <OrderList visible={listVisible} onClose={() => setListVisible(false)}/>
    </>
  )
}
