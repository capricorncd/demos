/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-07-18 17:13 (GMT+0900)
 *
 * 历史订单
 */
import React, { useState, useEffect } from 'react'
import './OrderHistory.scss'
import Header from '@/components/Common/Header/Header'
import { request } from '@/helpers'
import { Apis } from '@/assets/constants'
import { DefaultProps, OrderHistoryListItem, OrderHistoryResponse } from '@/types'
import AppPrice from '@/components/Common/AppPrice'
import { useHistory } from 'react-router-dom'
/* eslint-disable camelcase */
const mockList: OrderHistoryListItem[] = Array.from({ length: 100 }).map(() => {
  return {
    id: 'Order' + Math.random(),
    count: 2,
    total_price: 23333,
    actual_payment: 23333,
    actual_payment_remark: '',
    create_date: '2021-04-09 12:53',
  }
})

export default function OrderHistory() {
  const [page, setPage] = useState(1)
  const [isNoMore, setIsNoMore] = useState(false)
  const [data, setData] = useState<OrderHistoryResponse | null>(null)
  const [list, setList] = useState<OrderHistoryListItem[]>(mockList)
  const history = useHistory()

  useEffect(() => {
    if (isNoMore) return
    request
      .get<OrderHistoryResponse>(Apis.orderHistory, { limit: 10, page: page })
      .then((res) => {
        setData(res)
        // console.log(res)
        if (!res.order_list || !res.order_list.length) {
          setIsNoMore(true)
        } else {
          setList(list.concat(res.order_list))
          setPage(page + 1)
        }
      })
      .catch((err) => {
        // console.log(err)
      })

    // 下拉加载更多实现
    // setPage(page + 1)
  }, [page, isNoMore, list])

  return data ? (
    <div className={`order-history-page`}>
      <Header>
        <h4>历史订单</h4>
        <p className="fs12">/{data.total}</p>
      </Header>

      <ul className="list-wrapper">
        {list.map((item, i) => (
          <OrderListItem data={item} key={i} onClick={() => history.push(`/order/detail/${item.id}`)} />
        ))}
      </ul>
    </div>
  ) : null
}

interface OrderListItemProps extends DefaultProps {
  data: OrderHistoryListItem
}

function OrderListItem(props: OrderListItemProps) {
  const data = props.data
  return (
    <li onClick={props.onClick}>
      <div className="left">
        <h4>{data.id}</h4>
        <p className={`fs12 color-gray`}>{data.create_date}</p>
      </div>
      <div className="right align-right">
        <AppPrice primary>{data.actual_payment}</AppPrice>
        <div className="count color-gray fs12">x {data.count}</div>
      </div>
    </li>
  )
}
