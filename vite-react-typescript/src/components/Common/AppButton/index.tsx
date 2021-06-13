/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-12 23:09 (GMT+0900)
 */
import React from 'react'
import './index.scss'
import {AnyObject, ClickFunction} from "@/types";
import {calc} from "@/helpers";

export interface AppButtonProps {
  children?: string;
  onClick?: ClickFunction;
  width?: number | string;
  small?: boolean;
}

export default function AppButton(props: AppButtonProps) {

  const classes = ['app-button']

  if (props.small) classes.push('is-small')

  const styles: AnyObject = {}
  if (props.width) {
    styles.width = calc(props.width)
  }

  return (
    <button className={classes.join(' ')} style={styles} onClick={props.onClick}>{
      props.children
    }</button>
  )
}
