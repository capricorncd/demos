/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-07-01 20:18 (GMT+0900)
 */
import { configureStore } from '@reduxjs/toolkit'
import {counterSlice} from './counterSlice'
import {dataSlice} from './dataSlice'

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    data: dataSlice.reducer
  },
})

export {
  dataSlice,
  counterSlice,
}

export default store
