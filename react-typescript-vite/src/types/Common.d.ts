/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-12 23:06 (GMT+0900)
 *
 * #Common.d.ts
 * 公用类型定义文件
 */
import React from 'react'
import columns from '@/assets/constants/lang/columns'
import {AppConstants} from '@/assets/constants'

// 任意对象类型
export type AnyObject = Record<string, any>;

// 点击事件回调函数
export type ClickFunction = (e?: React.MouseEvent) => void;

// 组件默认属性
export interface DefaultProps {
  className?: string; // css class名
  onClick?: ClickFunction; // 点击事件回调函数
  children?: JSX.Element | React.ReactNode; // children
  style?: AnyObject; // 自定义样式
  data?: AnyObject | AnyObject[]; // 数据
}

// request HTTP请求参数
export interface RequestOptions {
  url: string;
  method?: string;
  data?: AnyObject;
  headers?: AnyObject;
}

// language: en/ja/ko/zh
export type LanguageTypes = typeof AppConstants.languageTypeEN
  | typeof AppConstants.languageTypeJA
  | typeof AppConstants.languageTypeZH
  | typeof AppConstants.languageTypeKO

export type LanguageData = Record<typeof columns[keyof typeof columns], string>
