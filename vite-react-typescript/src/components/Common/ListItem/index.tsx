/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-13 12:09 (GMT+0900)
 */
import React from 'react'
import './index.scss'
import {DefaultProps, FoodDetail} from '@/types'
import {getClasses} from '@/helpers'
import AppImage from '@/components/Common/AppImage'
import AppPrice from '@/components/Common/AppPrice'
import CountButtonGroup from '@/components/Common/CountButtonGroup'
import store, {counterSlice} from '@/stores'

interface ListItemProps extends DefaultProps {
  data: FoodDetail;
}

export default function ListItem(props: ListItemProps) {
  const classes = getClasses('common-list-item', props.className)
  const data = props.data
  const foodId = data.id
  const hasSpecif = data.specifications && data.specifications.length > 0

  function handleChange(isMinus: boolean, count: number): void {
    if (isMinus) {
      store.dispatch(counterSlice.actions.remove(foodId))
    } else {
      store.dispatch(counterSlice.actions.add( {
        id: foodId,
        // specifications: [],
      }))
      // 首次添加时，判断是否有规格选项
      // 如果有，则显示详情弹窗
      if (!count && hasSpecif) {
        props.onClick && props.onClick()
      }
    }
  }

  return (
    <section className={classes} onClick={props.onClick}>
      <AppImage src={data.cover}/>
      <dl className="list-item__info">
        <dd>
          <h4 className="ell">{data.name}</h4>
          <p className="fs12 color-gray">{data.sub_name}</p>
          <p className="fs12 color-gray">{data.remark}</p>
        </dd>
        <dd className="flex-space-between">
          <AppPrice>{data.price}</AppPrice>
          <CountButtonGroup foodId={foodId} change={handleChange}/>
        </dd>
      </dl>
    </section>
  )
}
