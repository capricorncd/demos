/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-12 23:06 (GMT+0900)
 *
 * #Common.d.ts
 * 公用类型定义文件
 */
import React from 'react'

// 任意对象
export type AnyObject = Record<string, any>;

// 点击事件回调函数
export type ClickFunction = (e: React.MouseEvent) => void;

// 组件默认属性
export interface DefaultProps {
  className?: string;
  onClick?: ClickFunction;
  children?: JSX.Element | React.ReactNode;
  styles?: AnyObject;
}
