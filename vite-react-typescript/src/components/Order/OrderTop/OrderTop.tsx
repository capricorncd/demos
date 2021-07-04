/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-20 22:06 (GMT+0900)
 */
import React from 'react'
import {IconFood} from '@/components/Common/Icons'
import './OrderTop.scss'
import {DefaultProps, OrderDetailResponse} from '@/types'
import { OrderStatus } from '@/assets/constants'

interface OrderTopProps extends DefaultProps {
  data: OrderDetailResponse;
}

export default function OrderTop(props: OrderTopProps) {
  const status = props.data.status
  return (
    <section className={`order-page__top`}>
      <div className="align-center">订单号</div>
      <h1 className="align-center mt10">{props.data.order_id}</h1>
      <dl className={`order-status`}>
        <dd className={status === OrderStatus.placed ? `active` : ``}>
          <IconFood/>
          <div>已下单</div>
        </dd>
        <dd className="space"/>
        <dd className={status === OrderStatus.making ? `active` : ``}>
          <IconFood/>
          <div>制作中</div>
        </dd>
        <dd className="space"/>
        <dd className={status === OrderStatus.completed ? `active` : ``}>
          <IconFood/>
          <div>已完成</div>
        </dd>
      </dl>
    </section>
  )
}
