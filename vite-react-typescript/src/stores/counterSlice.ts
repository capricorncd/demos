/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-07-01 20:24 (GMT+0900)
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {StoreCounterState, StoreCounterListItem} from '@/types'
import {toNumber} from '@/helpers'

const initialState: StoreCounterState = {
  list: [],
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    add: (state: StoreCounterState, {payload}: PayloadAction<StoreCounterListItem>) => {
      const item = state.list.find(item => item.id === payload.id)
      if (item) {
        item.count = toNumber(item.count) + 1
        state.list = [...state.list]
      } else {
        state.list = [...state.list, {
          ...payload,
          count: 1,
        }]
      }
    },
    update: (state: StoreCounterState, {payload}: PayloadAction<StoreCounterListItem>) => {
      const index = state.list.findIndex(item => item.id === payload.id)
      if (index !== -1) {
        state.list[index] = {
          ...payload,
          count: state.list[index].count,
        }
        state.list = [...state.list]
      }
    },
    remove: (state: StoreCounterState, {payload}: PayloadAction<number>) => {
      const index = state.list.findIndex(item => item.id === payload)
      if (index !== -1) {
        // @ts-ignore
        if (state.list[index].count > 1) {
          // @ts-ignore
          state.list[index].count -= 1
        } else {
          state.list.splice(index, 1)
        }
        state.list = [...state.list]
      }
    },
    removeAll: (state: StoreCounterState) => {
      state.list = []
    },
  },
})
