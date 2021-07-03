/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-12 22:57 (GMT+0900)
 */
import React from 'react'
import AppPrice from '@/components/Common/AppPrice'
import {DefaultProps, FoodSpecificationItem} from '@/types'
import './index.scss'

interface CheckBoxProps extends DefaultProps {
  data: FoodSpecificationItem,
  change?: (checked: boolean, item: FoodSpecificationItem) => void;
  checked?: boolean;
}
export default function CheckBox(props: CheckBoxProps) {
  const classes = ['check-box']
  if (props.checked) classes.push('is-checked')

  function handleClick() {
    props.change && props.change(!props.checked, props.data)
  }

  return (
    <button className={classes.join(' ')} onClick={handleClick}>
      {props.data.name}
      <AppPrice className="price" fontSize={10}>{props.data.price}</AppPrice>
    </button>
  )
}
