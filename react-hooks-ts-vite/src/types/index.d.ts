/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-12 22:24 (GMT+0900)
 */
import React from 'react'
import store from '@/stores'

export interface AnyObject {
  [key: string]: any
}

export type ClickFunction = (e?: React.MouseEvent) => void

export interface DefaultProps {
  className?: string
  onClick?: ClickFunction
  children?: JSX.Element | React.ReactNode
  style?: AnyObject
  data?: AnyObject | AnyObject[] | null
}

export type RootState = ReturnType<typeof store.getState>
