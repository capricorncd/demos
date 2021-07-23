/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-19 17:03 (GMT+0900)
 */
import React, { useState } from 'react'
import { ClickFunction, DefaultProps, FoodDetail, StoreCounterListItem, StoreDataFoods } from '@/types'
import AppPrice from '@/components/Common/AppPrice'
import CountButtonGroup from '@/components/Common/CountButtonGroup'
import { IconList, IconTrash } from '@/components/Common/Icons'
import store, { counterSlice } from '@/stores'
import './OrderList.scss'

interface OrderListProps extends DefaultProps {
  visible?: boolean
  onClose: ClickFunction
  data: StoreCounterListItem[]
  foods: StoreDataFoods
  onItemClick: (id: number) => void
}

interface ListItem {
  id: number
  name: string
  count: number
  price: number
  remark: string[]
}

export default function OrderList(props: OrderListProps) {
  const foods = props.foods

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

  function clear(e: React.MouseEvent): void {
    store.dispatch(counterSlice.actions.removeAll())
    props.onClose(e)
  }

  let temp: FoodDetail
  const list: ListItem[] = props.data.map((item) => {
    temp = foods[item.id]
    let price = temp.price
    const remark: string[] = []
    item.specifications?.forEach((s) => {
      price += s.price
      remark.push(s.name)
    })
    return {
      id: item.id,
      name: temp.name,
      count: item.count as number,
      price,
      remark,
    }
  })

  const total = list.reduce((prev, item) => prev + item.count, 0)

  return (
    <>
      <div className={maskClasses.join(' ')} onClick={props.onClose} />
      <dl className={classes.join(' ')} onClick={(e) => e.stopPropagation()}>
        <dt className="flex-space-between bg">
          <div className="fs12 flex">
            <IconList /> 已选商品({total})
          </div>
          <div className="fs12 color-gray flex" onClick={clear}>
            <IconTrash /> 清空
          </div>
        </dt>
        <dd>
          {list.map((v, i) => (
            <ListItem key={i} item={v} onClick={() => props.onItemClick(v.id)} />
          ))}
        </dd>
      </dl>
    </>
  )
}

interface ListItemProps extends DefaultProps {
  item: ListItem
}

function ListItem({ item, onClick }: ListItemProps) {
  function handleChange(isMinus: boolean): void {
    if (isMinus) {
      store.dispatch(counterSlice.actions.remove(item.id))
    } else {
      store.dispatch(
        counterSlice.actions.add({
          id: item.id,
          specifications: [],
        }),
      )
    }
  }

  return (
    <section className="list-item" onClick={onClick}>
      <div className="name">
        <div className="fs14">{item.name}</div>
        <div className="fs12 color-gray">{item.remark.join(' / ')}</div>
      </div>
      <AppPrice className="price ml10" primary>
        {item.price * item.count}
      </AppPrice>
      <CountButtonGroup className="btn-count" foodId={item.id} change={handleChange} />
    </section>
  )
}
