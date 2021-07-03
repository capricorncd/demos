/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-12 17:45 (GMT+0900)
 */
import React, { useState, useEffect, useRef } from 'react'
import AppImage from '@/components/Common/AppImage'
import CheckBox from '@/components/Common/CheckBox'
import AppPrice from '@/components/Common/AppPrice'
import AppTitle from '@/components/Common/AppTitle'
import CountButtonGroup from '@/components/Common/CountButtonGroup'
import {
  ClickFunction,
  DefaultProps,
  FoodDetail,
  FoodSpecificationItem,
  RootState,
  StoreCounterListItem,
  StoreDataSpecCategories,
  FoodSpecCategoryItem,
} from '@/types'
import {useSelector} from 'react-redux'
import store, { counterSlice } from '@/stores'
import { setBodyScrollStatus } from '@/helpers'
import './index.scss'

interface DetailProps extends DefaultProps {
  visible: boolean;
  onClose: ClickFunction;
  data: FoodDetail;
}

interface SpecificationData extends FoodSpecCategoryItem {
  list: FoodSpecificationItem[];
}

export default function DetailPopup(props: DetailProps) {
  if (!props.data.id) return null

  const popupBodyRef = useRef<HTMLDivElement>(null)

  const data = props.data
  const foodId = data.id

  const specificationCategories = useSelector<RootState>((state) => state.data.specificationCategories) as StoreDataSpecCategories
  const selectedList = useSelector<RootState>((state) => state.counter.list) as StoreCounterListItem[]
  const selectedItem = selectedList.find(item => item.id === foodId)
  const specifications = selectedItem?.specifications || []

  const [isInitialed, setIsInitialed] = useState(false)


  const classes: string[] = ['common-popup', 'detail-popup', 'fixed-full']

  if (props.visible) {
    classes.push('fade-in')
    if (!isInitialed) setIsInitialed(true)
  } else if (isInitialed) {
    classes.push('fade-out')
  }

  useEffect(() => {
    setBodyScrollStatus(props.visible)
    if (props.visible) {
      // @ts-ignore
      popupBodyRef.current.scrollTop = 0
    }
  }, [props.visible])

  function handleClose(e: React.MouseEvent): void {
    e.stopPropagation()
    props.onClose(e)
  }


  function handleChange(isMinus: boolean): void {
    if (isMinus) {
      store.dispatch(counterSlice.actions.remove(foodId))
    } else {
      store.dispatch(counterSlice.actions.add({
        id: foodId,
        specifications: specifications,
      }))
    }
  }

  function handleSelect(isChecked: boolean, item: FoodSpecificationItem): void {
    const list = [...specifications]
    if (isChecked) {
      list.push(item)
    } else {
      list.splice(list.findIndex(s => s.id === item.id), 1)
    }
    // setSpecifications(list)
    store.dispatch(counterSlice.actions.update({
      id: foodId,
      specifications: list
    }))
  }
  const specPrice = specifications.reduce((prev, item) => prev + item.price, 0)
  const price = selectedItem && selectedItem.count
    ? selectedItem.count * (props.data.price + specPrice)
    : 0

  const specificationData: Record<string, SpecificationData> = {}
  data.specifications.forEach(item => {
    if (!specificationData[item.c_id]) {
      specificationData[item.c_id] = {
        ...specificationCategories[item.c_id],
        list: []
      }
    }
    specificationData[item.c_id].list.push(item)
  })

  return (
    <section className={classes.join(' ')}>
      <section className="common-popup__inner shadow">
        <button className="close" onClick={handleClose}/>
        <dl className="header">
          <AppImage className="cover" src={data.cover}/>
          <dt className="mt10">{data.name}</dt>
          <dd className="mt4">{data.sub_name}</dd>
        </dl>

        <div className="body" ref={popupBodyRef}>
          <div className="fs12 color-gray mt10">{data.remark}</div>
          {
            Object.values(specificationData).map((item, index) => (
              <div key={index}>
              <AppTitle>{item.name}<span className="small-text">{item.is_multiple_choice ? '（多数選択可能）' : null}</span></AppTitle>
              {
                item.list.map((v, k) => (
                  <CheckBox key={k} data={v} checked={specifications.some(item => item.id === v.id)} change={handleSelect}/>
                ))
              }
              </div>
            ))
          }
          <div className="detail-content color-gray">
            <div>{data.content}</div>
            {
              data.image_list && data.image_list.map((url, k) => (<img src={url} key={k}/>))
            }
          </div>
        </div>

        <div className="footer">
          {
            price ? (
              <AppPrice className={`total-price`} fontSize={24} primary>{price}</AppPrice>
            ) : null
          }
          <div className="plus-items gray">{specifications.map(item => item.name).join('、')}</div>
          <CountButtonGroup className="btn-count" foodId={props.data.id} change={handleChange}/>
        </div>
      </section>
    </section>
  )
}
