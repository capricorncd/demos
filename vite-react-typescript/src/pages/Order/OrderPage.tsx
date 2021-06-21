/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-20 15:26 (GMT+0900)
 */
import React from 'react'
import { Link } from "react-router-dom";
import Header from "@/components/Common/Header/Header";
import OrderListItem from "@/components/Common/OrderListItem/OrderListItem";
import AppPrice from "@/components/Common/AppPrice";
import AppLabel from "@/components/Common/AppLabel/AppLabel";
import OrderTop from "@/components/Order/OrderTop/OrderTop";
import './OrderPage.scss'

export default function OrderPage() {
  return (
    <div className={`order-page`}>
      <Header rightChildren={<HistoryLink/>}>
        <h4>订单详情</h4>
        <p>已下单-{`>`}制作中-{`>`}已完成</p>
      </Header>

      <OrderTop/>

      <section className="order-list">
        { Array.from({length: Math.round(Math.random() * 30)}).map((v, i) => (<OrderListItem key={i}/>)) }
        <AppLabel name="备注" className={`mt20`}>备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注,备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注.</AppLabel>
      </section>
      <section className="order-list__footer">
        <div className={`fs14 color-gray`}>
          共6件，合计 <AppPrice className={`ml10 fs16`} primary>9000</AppPrice>
        </div>
      </section>
    </div>
  )
}

function HistoryLink() {
  return (
    <Link to={`/order/history`}>历史订单</Link>
  )
}
