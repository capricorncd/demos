/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-19 15:18 (GMT+0900)
 */
import React, { useState } from 'react'
import OrderList from '@/components/Common/OrderList/OrderList'
import './FooterBar.scss'
import {Link} from 'react-router-dom'
import {IconArrow, IconFood, IconUser} from '@/components/Common/Icons'
import AppButton from '@/components/Common/AppButton'
import SideBar from '@/components/Common/SideBar/SideBar'

export default function FooterBar() {
  const [listVisible, setListVisible] = useState(false)
  const [sideBarVisible, setSideBarVisible] = useState(false)

  function handleClick(): void {
    setListVisible(!listVisible)
  }

  return (
    <>
      <section className="footer-bar">
        {/*<Link to={`/order/detail/0`} className={`mr10`}>*/}
        <AppButton className="footer-bar__btn-list mr10" onClick={() => setSideBarVisible(true)}>
          <IconUser/>
        </AppButton>
        {/*</Link>*/}
        <dl className={`bg-primary shadow flex`} onClick={handleClick}>
          <dd className="shopping-cart flex-center fs20">
            <IconFood className="mr4 mb4"/>
            <h2>89</h2>
          </dd>
          <dd className="pl10 color-white">
            <span className="small-text">¥</span> 900
          </dd>
          <Link to="/confirm" className={'flex-center btn-confirm'}>
            确定 <IconArrow/>
          </Link>
        </dl>
      </section>
      <OrderList visible={listVisible} onClose={() => setListVisible(false)}/>
      <SideBar visible={sideBarVisible} onClose={() => setSideBarVisible(false)}/>
    </>
  )
}
