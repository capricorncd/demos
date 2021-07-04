/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-19 15:18 (GMT+0900)
 */
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import OrderList from '@/components/Home/OrderList/OrderList'
import {Link} from 'react-router-dom'
import {IconArrow, IconFood, IconUser} from '@/components/Common/Icons'
import AppButton from '@/components/Common/AppButton'
import SideBar from '@/components/Common/SideBar/SideBar'
import {DefaultProps, FoodDetail, RootState, StoreCounterListItem, StoreDataFoods} from '@/types'
import './FooterBar.scss'

interface FooterBarProps extends DefaultProps {

}

export default function FooterBar(props: FooterBarProps) {
  const selectedList = useSelector<RootState>((state) => state.counter.list) as StoreCounterListItem[]
  const foods = useSelector<RootState>((state) => state.data.foods) as StoreDataFoods
  const [listVisible, setListVisible] = useState(false)
  const [sideBarVisible, setSideBarVisible] = useState(false)

  function handleClick(): void {
    setListVisible(!listVisible)
  }
  let totalPrice = 0
  let temp: FoodDetail
  selectedList.forEach(item => {
    temp = foods[item.id]
    let price = temp.price
    item.specifications?.forEach(s => {
      price += s.price
    })
    totalPrice += price * (item.count as number)
  })

  if (!selectedList.length && listVisible) {
    setListVisible(false)
  }

  return (
    <>
      {/*<Link to={`/order/detail/0`} className={`mr10`}>*/}
      <AppButton className="footer-bar__btn" onClick={() => setSideBarVisible(true)}>
        <IconUser/>
      </AppButton>
      {/*</Link>*/}
      {
        selectedList.length ? (
          <dl className={`footer-bar__submit bg-primary shadow flex`} onClick={handleClick}>
            <dd className="shopping-cart flex-center fs20">
              <IconFood className="mr4 mb4"/>
              <h2>{selectedList.reduce((prev, item) => prev + (item.count as number), 0)}</h2>
            </dd>
            <dd className="pl10 color-white">
              <span className="small-text">¥</span> {totalPrice}
            </dd>
            <Link to="/confirm" className={'flex-center btn-confirm'}>
              确定 <IconArrow/>
            </Link>
          </dl>
        ) : null
      }
      <OrderList
        visible={listVisible}
        data={selectedList}
        foods={foods}
        onClose={() => setListVisible(false)}/>
      <SideBar
        data={props.data}
        visible={sideBarVisible}
        onClose={() => setSideBarVisible(false)}/>
    </>
  )
}
