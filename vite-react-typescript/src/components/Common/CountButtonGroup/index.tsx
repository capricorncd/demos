/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-12 15:35 (GMT+0900)
 */
import React from 'react'
import {DefaultProps, StoreCounterListItem, RootState} from '@/types'
import {useSelector} from 'react-redux'
import './index.scss'

interface CountButtonGroupProps extends DefaultProps {
  foodId: number;
  change: (isMinus: boolean) => void;
}

export default function CountButtonGroup(props: CountButtonGroupProps) {
  const selectedList = useSelector<RootState>((state) => state.counter.list) as StoreCounterListItem[]
  const classes = ['common-count-button-group flex-end']

  if (props.className) classes.push(props.className)
  const count = selectedList.find(item => item.id === props.foodId)?.count || 0
  if (count) classes.push('has-count')

  return (
    <section className={classes.join(' ')} onClick={(e) => e.stopPropagation()}>
      <button className="minus" onClick={(e) => props.change(true)}/>
      <div className="count">{count}</div>
      <button className="plus" onClick={(e) => props.change(false)}/>
    </section>
  )
}
