/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-19 18:41 (GMT+0900)
 */
import React, {useState} from 'react'
import AppButton from '@/components/Common/AppButton'
import Header from '@/components/Common/Header/Header'
import ConfirmOrderList from '@/components/Confirm/OrderList/ConfirmOrderList'
import {getCache, request, setCache} from '@/helpers'
import {Apis, CacheKeys} from '@/assets/constants'
import {RootState, StoreCounterListItem, SubmitOrderResponse} from '@/types'
import './Confirm.scss'
import {useSelector} from 'react-redux'
import {IconEdit} from '@/components/Common/Icons'
import AppLabel from '@/components/Common/AppLabel/AppLabel'
import {useHistory} from 'react-router-dom'
import store, {counterSlice} from '@/stores'

export default function Confirm() {
  const history = useHistory()
  const [remark, setRemark] = useState<string | null>(getCache(CacheKeys.confirmRemark))
  const selectedList = useSelector<RootState>((state) => state.counter.list) as StoreCounterListItem[]

  if (!selectedList || !selectedList.length) {
    history.replace('/home')
    return (<></>)
  }

  function submit(): void {
    const params = {
      shopId: 1,
      tableId: 10,
      remark,
      foodList: selectedList.map(item => {
        return {
          id: item.id,
          count: item.count,
          specifications: item.specifications?.map(s => s.id) || [],
        }
      })
    }
    request.post<SubmitOrderResponse>(Apis.orderSubmit, params)
      .then(res => {
        console.log(res);
        setCache(CacheKeys.confirmResponse, res)
        // 清除备注数据
        setCache(CacheKeys.confirmRemark, null)
        // 清除已选数据
        store.dispatch(counterSlice.actions.removeAll())
        history.push('/order/detail/' + res.order_id)
      })
      .catch(console.error)
  }

  function showEditPopup() {
    console.log('showEditPopup')
  }

  return (
    <div className="confirm-page">
      <Header/>

      <ConfirmOrderList data={selectedList}>
        <AppLabel
          name="备注"
          className={`mt20`}
          right={<IconEdit className={`color-primary`} onClick={showEditPopup}/>}
        >{ remark || '无' }</AppLabel>
      </ConfirmOrderList>

      <footer>
        <AppButton className="shadow" onClick={submit}>确定下单</AppButton>
      </footer>
    </div>
  )
}
