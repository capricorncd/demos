/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-19 18:41 (GMT+0900)
 */
import React from 'react'
import { Link } from "react-router-dom";
import './Confirm.scss'
import AppButton from "@/components/Common/AppButton";
import AppPrice from "@/components/Common/AppPrice";
import IconArrow from "@/components/Common/Icons/IconArrow";
import ListItem from "@/components/Common/ListItem";

export default function Confirm() {
  return (
    <div className="confirm-page">
      <header className="bg-primary color-white">
        <Link to="home" className="back flex-center">
          <IconArrow left className="color-white"/>
        </Link>
        <h4>店铺名称</h4>
        <p className="fs12">桌号 8</p>
      </header>

      <div className="order-list">
        {
          Array.from({length: Math.round(Math.random() * 10)}).map((v, i) => (
            <ListItem key={i}/>
          ))
        }
      </div>

      <footer>
        <AppButton className="shadow">
          <AppPrice className="color-white">90000</AppPrice>
          <span className="submit-text">确定下单</span>
        </AppButton>
      </footer>
    </div>
  )
}
