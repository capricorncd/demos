/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-20 18:22 (GMT+0900)
 */
import React from 'react'
import AppPrice from "@/components/Common/AppPrice";
import AppImage from "@/components/Common/AppImage";
import './OrderListItem.scss'
import {DefaultProps} from "@/types";
import tempImgPath from '~/temp/welcome.jpg'

interface OrderListItemProps extends DefaultProps {

}

export default function OrderListItem(props: OrderListItemProps) {
  const classes = ['order-list-item']
  if (props.className) classes.push(props.className)
  return (
    <dl className={classes.join(' ')}>
      <AppImage src={tempImgPath} className={`cover`}/>
      <dt>
        <h4>商品名称菜品名称名称名称商品名称菜品名称名称名称</h4>
        <AppPrice>343</AppPrice>
      </dt>
      <dd className="flex-space-between fs12 color-gray">
        <div>说明说明说明说明</div>
        <div>x {Math.round(Math.random() * 5) || 1}</div>
      </dd>
    </dl>
  )
}
