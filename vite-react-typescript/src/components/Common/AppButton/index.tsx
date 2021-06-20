/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-12 23:09 (GMT+0900)
 */
import React from 'react'
import './index.scss'
import {AnyObject, DefaultProps} from "@/types";
import {calc} from "@/helpers";

export interface AppButtonProps extends DefaultProps {
  width?: number | string;
  small?: boolean;
  inline?: boolean;
}

export default function AppButton(props: AppButtonProps) {

  const classes = ['app-button']

  if (props.small) classes.push('is-small')
  if (props.className) classes.push(props.className)

  const styles: AnyObject = {}
  if (props.width) {
    styles.width = calc(props.width)
  }
  if (props.inline) styles.display = 'inline-flex'

  return (
    <button className={classes.join(' ')} style={styles} onClick={props.onClick}>{
      props.children
    }</button>
  )
}
