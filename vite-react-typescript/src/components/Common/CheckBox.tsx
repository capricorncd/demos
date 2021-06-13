/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-12 22:57 (GMT+0900)
 */
import React, {useState} from 'react'
import AppPrice from "@/components/Common/AppPrice";
import {DefaultProps} from "@/types";

interface CheckBoxProps extends DefaultProps {
  data: {
    label: string;
    price: number;
  }
}
export default function CheckBox(props: CheckBoxProps) {
  const [checked, setChecked] = useState(false)

  const classes = ['check-box']
  if (checked) classes.push('is-checked')

  return (
    <button className={classes.join(' ')} onClick={() => setChecked(!checked)}>
      {props.data.label}
      <AppPrice className="price" fontSize={10}>{props.data.price}</AppPrice>
    </button>
  )
}
