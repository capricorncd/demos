/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-07-24 11:55 (GMT+0900)
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  count: 0,
}

interface StoreCounterState {
  count: number
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increase: (state: StoreCounterState, { payload }: PayloadAction<number>) => {
      state.count += payload
    },
    decrease: (state: StoreCounterState, { payload }: PayloadAction<number>) => {
      state.count -= payload
    },
  },
})
