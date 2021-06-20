/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-19 18:41 (GMT+0900)
 */
import React from 'react'
import AppButton from "@/components/Common/AppButton";
import Header from "@/components/Common/Header/Header";
import ConfirmOrderList from "@/components/Confirm/OrderList/ConfirmOrderList";
import './Confirm.scss'

export default function Confirm() {
  return (
    <div className="confirm-page">
      <Header>
        <h4>店铺名称</h4>
        <p className="fs12">桌号 8</p>
      </Header>

      <ConfirmOrderList/>

      <footer>
        <AppButton className="shadow">确定下单</AppButton>
      </footer>
    </div>
  )
}
