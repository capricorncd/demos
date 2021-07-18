/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-20 18:22 (GMT+0900)
 */
import React from 'react'
import AppPrice from '@/components/Common/AppPrice'
import AppImage from '@/components/Common/AppImage'
import './OrderListItem.scss'
import {DefaultProps, FoodDetail} from '@/types'
import {toNumber} from "@/helpers";

interface OrderListItemProps extends DefaultProps {
  data: FoodDetail;
}

export default function OrderListItem(props: OrderListItemProps) {
  const classes = ['order-list-item']
  if (props.className) classes.push(props.className)

  const data = props.data
  let price = data.price
  let remark: string[] = []
  if (data.specifications) {
    data.specifications.forEach(item => {
      price += toNumber(item.price)
      remark.push(item.name)
    })
  }

  return (
    <dl className={classes.join(' ')}>
      <AppImage src={data.cover} className={`cover`}/>
      <dt>
        <h4>{data.name}</h4>
        <AppPrice>{price}</AppPrice>
      </dt>
      <dd className="flex-space-between fs12 color-gray">
        <div className={`remark`}>{remark.join('、')}</div>
        <div>x {data.count}</div>
      </dd>
    </dl>
  )
}
