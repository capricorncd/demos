/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-07-24 11:54 (GMT+0900)
 */
import { configureStore } from '@reduxjs/toolkit'
import { counterSlice } from './counterSlice'

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
})

export { counterSlice }

export default store
