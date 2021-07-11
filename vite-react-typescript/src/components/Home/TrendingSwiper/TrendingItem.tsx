/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-12 14:43 (GMT+0900)
 */
import React from 'react'
import AppImage from '@/components/Common/AppImage'
import CountButtonGroup from '@/components/Common/CountButtonGroup'
import AppPrice from '@/components/Common/AppPrice'
import {DefaultProps, FoodDetail} from '@/types'
import store, {counterSlice} from '@/stores'

interface TrendingItemProps extends DefaultProps {
  data: FoodDetail;
}

export default function TrendingItem(props: TrendingItemProps): JSX.Element {
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
      if (!count && hasSpecif) {
        props.onClick && props.onClick()
      }
    }
  }

  return (
    <div className="home-trending-item shadow" onClick={props.onClick}>
      <AppImage
        src={data.cover}
        height={100}/>
      <h5 className="ell">{data.name}</h5>
      <div className="flex-space-between fs14">
        <AppPrice>{ data.price }</AppPrice>
        <CountButtonGroup foodId={foodId} change={handleChange}/>
      </div>
    </div>
  )
}
