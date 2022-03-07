/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-07-24 12:14 (GMT+0900)
 */
import React from 'react'
import { useSelector } from 'react-redux'
import store, { counterSlice } from '@/stores'
import { RootState } from '@/types'

export default function Home() {
  const count = useSelector<RootState>((state) => state.counter.count) as number
  return (
    <div>
      <h1>Home</h1>
      <p>{count}</p>
      <div>
        <button onClick={() => store.dispatch(counterSlice.actions.increase(1))} className={`mr20`}>
          increase
        </button>
        <button onClick={() => store.dispatch(counterSlice.actions.decrease(1))}>decrease</button>
      </div>
    </div>
  )
}
