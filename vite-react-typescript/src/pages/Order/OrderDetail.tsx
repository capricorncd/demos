/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-20 15:26 (GMT+0900)
 *
 * 订单详情页
 */
import React, { useEffect, useState } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import Header from '@/components/Common/Header/Header'
import OrderListItem from '@/components/OrderListItem/OrderListItem'
import AppPrice from '@/components/Common/AppPrice'
import AppLabel from '@/components/Common/AppLabel/AppLabel'
import OrderTop from '@/components/Order/OrderTop/OrderTop'
import './OrderDetail.scss'
import { OrderDetailResponse } from '@/types'
import { request } from '@/helpers'
import { Apis } from '@/assets/constants'
import Loading from '@/components/Common/Loading/Loading'

export default function OrderDetail() {
  const [data, setData] = useState<OrderDetailResponse | null>(null)
  const { id: orderId } = useParams<{ id: string }>()
  const history = useHistory()

  useEffect(() => {
    request
      .get<OrderDetailResponse>(Apis.orderDetail, { orderId })
      .then((res) => {
        if (!res || !res.order_id) {
          alert('订单不存在！')
          history.replace('/home')
          return
        }
        setData(res)
      })
      .catch(console.error)
  }, [orderId, history])

  if (!data) {
    return <Loading />
  }

  let total = 0

  data.list.forEach((item) => {
    const count = item.count as number
    total += count
  })

  return (
    <div className={`order-page`}>
      <Header rightChildren={<HistoryLink />}>
        {/*<h4>订单详情</h4>*/}
        {/*<p>已下单-{`>`}制作中-{`>`}已完成</p>*/}
      </Header>

      <OrderTop data={data} />

      <section className="order-list">
        {data.list.map((v, i) => (
          <OrderListItem data={v} key={i} />
        ))}
        <AppLabel name="备注" className={`mt20`}>
          {data.remark || '无'}
        </AppLabel>
        <AppLabel name="下单时间" className={`mt20`}>
          {data.create_date}
        </AppLabel>
      </section>
      <section className="order-list__footer">
        <div className={`fs14 color-gray`}>
          共{total}件，合计{' '}
          <AppPrice className={`ml10 fs16`} primary>
            {data.actual_payment}
          </AppPrice>
          {data.actual_payment_remark ? <div className={`fs12`}>{data.actual_payment_remark}</div> : null}
        </div>
      </section>
    </div>
  )
}

function HistoryLink() {
  return <Link to={`/order/history`}>历史订单</Link>
}
