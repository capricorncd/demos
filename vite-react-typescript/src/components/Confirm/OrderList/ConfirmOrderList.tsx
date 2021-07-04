/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-20 21:58 (GMT+0900)
 */
import React from 'react'
import {useSelector} from 'react-redux'
import OrderListItem from '@/components/OrderListItem/OrderListItem'
import AppPrice from '@/components/Common/AppPrice'
import {DefaultProps, FoodDetail, RootState, StoreCounterListItem, StoreDataFoods} from '@/types'
import './ConfirmOrderList.scss'

interface ConfirmOrderListProps extends DefaultProps {
  data: StoreCounterListItem[];
}

export default function ConfirmOrderList(props: ConfirmOrderListProps) {
  const selectedList = props.data
  const foods = useSelector<RootState>((state) => state.data.foods) as StoreDataFoods

  let totalPrice = 0
  let count = 0

  let temp: FoodDetail
  const list: FoodDetail[] = selectedList.map(item => {
    temp = foods[item.id]
    let price = temp.price
    count += item.count as number
    if (item.specifications) {
      item.specifications.forEach(s => {
        price += s.price
      })
    }
    totalPrice += price * (item.count as number)
    return {
      count: item.count,
      ...foods[item.id],
      specifications: item.specifications || [],
    }
  })

  return (
    <>
      <section className="confirm__order-list">
        {
          list.map((item, i) => (
            <OrderListItem data={item} key={i}/>
          ))
        }
        { props.children }
      </section>

      <section className="confirm__order-list__footer">
        <div className={`fs14 color-gray`}>
          共{count}件，合计 <AppPrice className={`ml10 fs16`} primary>{totalPrice}</AppPrice>
        </div>
      </section>
    </>
  )
}
