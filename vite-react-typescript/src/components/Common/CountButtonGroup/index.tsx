/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-12 15:35 (GMT+0900)
 */
import React, { useState } from 'react'
import './index.scss'

export default function CountButtonGroup() {

  const [count, setCount] = useState(0)

  function click(e: React.MouseEvent, isMinus: boolean = false): void {
    setCount(isMinus ? Math.max(0, count - 1) : count + 1)
  }

  return (
    <section className="common-count-button-group flex-end" onClick={(e) => e.stopPropagation()}>
      <Minus count={count} click={click}/>
      <button className="plus" onClick={(e) => click(e)}/>
    </section>
  )
}

function Minus({count, click}: {count: number, click: Function}) {
  if (count > 0) {
    return (
      <>
        <button className="minus" onClick={(e) => click(e, true)}/>
        <div className="count">{count}</div>
      </>
    )
  }
  return null
}
