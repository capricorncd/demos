/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-20 21:58 (GMT+0900)
 */
import React, {useState} from 'react'
import './ConfirmOrderList.scss'
import OrderListItem from '@/components/Common/OrderListItem/OrderListItem'
import AppLabel from '@/components/Common/AppLabel/AppLabel'
import {IconEdit} from '@/components/Common/Icons'
import AppPrice from '@/components/Common/AppPrice'

const DEF_REMARK = '备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注,备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注.'

export default function ConfirmOrderList() {
  const [remark, setRemark] = useState(DEF_REMARK)

  function showEditPopup() {
    console.log('showEditPopup')
  }

  return (
    <>
      <section className="confirm__order-list">
        {
          Array.from({length: Math.round(Math.random() * 10)}).map((v, i) => (
            <OrderListItem key={i}/>
          ))
        }
        <AppLabel
          name="备注"
          className={`mt20`}
          right={<IconEdit className={`color-primary`} onClick={showEditPopup}/>}
        >{ remark }</AppLabel>
      </section>

      <section className="confirm__order-list__footer">
        <div className={`fs14 color-gray`}>
          共6件，合计 <AppPrice className={`ml10 fs16`} primary>9000</AppPrice>
        </div>
      </section>
    </>
  )
}
