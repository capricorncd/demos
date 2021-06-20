/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-20 15:26 (GMT+0900)
 */
import React from 'react'
import Header from "@/components/Common/Header/Header";
import {IconFood} from "@/components/Common/Icons";
import OrderListItem from "@/components/Common/OrderListItem/OrderListItem";
import AppPrice from "@/components/Common/AppPrice";
import AppLabel from "@/components/Common/AppLabel/AppLabel";
import './OrderPage.scss'

export default function OrderPage() {
  return (
    <div className={`order-page`}>
      <Header>
        <h4>订单详情</h4>
        <p>已下单-{`>`}制作中-{`>`}已完成</p>
      </Header>
      <section className={`order-page__top`}>
        <div className="align-center">订单号</div>
        <h1 className="align-center mt10">S32320210614125410001</h1>
        <dl className={`order-status`}>
          <dd className={`color-gray-light`}>
            <IconFood/>
            <div>已下单</div>
          </dd>
          <dd className="space"/>
          <dd>
            <IconFood/>
            <div>制作中</div>
          </dd>
          <dd className="space"/>
          <dd className={`color-gray-light`}>
            <IconFood/>
            <div>已完成</div>
          </dd>
        </dl>
      </section>

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
