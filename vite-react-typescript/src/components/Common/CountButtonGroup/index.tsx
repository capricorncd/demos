/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-12 15:35 (GMT+0900)
 */
import React, { useState } from 'react'
import './index.scss'
import {DefaultProps} from "@/types";

interface CountButtonGroupProps extends DefaultProps {
  data?: number;
}

export default function CountButtonGroup(props: CountButtonGroupProps) {

  const [count, setCount] = useState(props.data ?? 0)

  const classes = ['common-count-button-group flex-end']

  if (props.className) classes.push(props.className)

  function click(isMinus: boolean = false): void {
    setCount(isMinus ? Math.max(0, count - 1) : count + 1)
  }

  if (count) classes.push('has-count')

  return (
    <section className={classes.join(' ')} onClick={(e) => e.stopPropagation()}>
      <button className="minus" onClick={(e) => click(true)}/>
      <div className="count">{count}</div>
      <button className="plus" onClick={(e) => click()}/>
    </section>
  )
}
