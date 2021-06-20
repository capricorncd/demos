/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-19 18:41 (GMT+0900)
 */
import React from 'react'
import AppButton from "@/components/Common/AppButton";
import AppPrice from "@/components/Common/AppPrice";
import OrderListItem from "@/components/Common/OrderListItem/OrderListItem";
import Header from "@/components/Common/Header/Header";
import './Confirm.scss'
import AppLabel from "@/components/Common/AppLabel/AppLabel";

export default function Confirm() {
  return (
    <div className="confirm-page">
      <Header>
        <h4>店铺名称</h4>
        <p className="fs12">桌号 8</p>
      </Header>

      <section className="order-list">
        {
          Array.from({length: Math.round(Math.random() * 10)}).map((v, i) => (
            <OrderListItem key={i}/>
          ))
        }
        <AppLabel name="备注" className={`mt20`}>备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注,备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注.</AppLabel>
      </section>

      <section className="order-list__footer">
        <div className={`fs14 color-gray`}>
          共6件，合计 <AppPrice className={`ml10 fs16`} primary>9000</AppPrice>
        </div>
      </section>

      <footer>
        <AppButton className="shadow">确定下单</AppButton>
      </footer>
    </div>
  )
}
