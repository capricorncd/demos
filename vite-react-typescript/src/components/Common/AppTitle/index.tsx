/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-19 10:25 (GMT+0900)
 */
import React from 'react'
import './index.scss'
import { DefaultProps } from "@/types";

export interface AppTitleProps extends DefaultProps {

}

export default function AppTitle(props: AppTitleProps) {
  return (
    <h6 className="mt10">種類・サイズなど<span className="small-text">（多数選択可能など）</span></h6>
  )
}