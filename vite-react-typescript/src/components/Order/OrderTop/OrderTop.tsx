/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-20 22:06 (GMT+0900)
 */
import React from 'react'
import './OrderTop.scss'
import {IconFood} from '@/components/Common/Icons'

export default function OrderTop() {
  return (
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
  )
}
