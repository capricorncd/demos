/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-19 17:03 (GMT+0900)
 */
import React, { useState } from 'react'
import './OrderList.scss'
import {ClickFunction, DefaultProps} from "@/types";
import AppPrice from "@/components/Common/AppPrice";
import CountButtonGroup from "@/components/Common/CountButtonGroup";
import {IconList, IconTrash} from "@/components/Common/Icons";

interface OrderListProps extends DefaultProps {
  visible?: boolean;
  onClose: ClickFunction;
}

export default function OrderList(props: OrderListProps) {
  const [isInitialed, setIsInitialed] = useState(false)
  const maskClasses = ['order-list-popup__bg']
  const classes = ['order-list-popup bg-white']

  if (props.visible) {
    maskClasses.push('fade-in')
    classes.push('fade-bottom-in')
    if (!isInitialed) {
      setIsInitialed(true)
    }
  } else if (isInitialed) {
    maskClasses.push('fade-out')
    classes.push('fade-bottom-out')
  }

  return (
    <>
      <div className={maskClasses.join(' ')} onClick={props.onClose}/>
      <dl className={classes.join(' ')} onClick={(e) => e.stopPropagation()}>
        <dt className="flex-space-between bg">
          <div className="fs12 flex">
            <IconList/> 已选商品(20)</div>
          <div className="fs12 color-gray flex">
            <IconTrash/> 清空
          </div>
        </dt>
        <dd>
          {
            Array.from({length: 20}).map((v, i) => (<ListItem key={i}/>))
          }
        </dd>
      </dl>
    </>
  )
}

function ListItem() {
  return (
    <section className="list-item">
      <div className="name">
        <div className="fs14">商品名称但是开发建设贷款商品名称但是开发建设贷款</div>
      </div>
      <AppPrice className="price ml10" primary>{Math.round(Math.random() * 100000)}</AppPrice>
      <CountButtonGroup className="btn-count" data={Math.round(Math.random() * 100)}/>
    </section>
  )
}
