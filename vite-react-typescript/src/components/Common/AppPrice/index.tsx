/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-12 23:37 (GMT+0900)
 */
import React from 'react'
import {AnyObject} from "@/types";
import {calc} from "@/helpers";
import './index.scss'

interface AppPriceProps {
  children?: string | number;
  fontSize?: string | number;
  className?: string;
  primary?: boolean;
}

export default function AppPrice(props: AppPriceProps) {
  const classes = ['app-price']
  if (props.className) {
    classes.push(props.className)
  }

  if (props.primary) {
    classes.push('primary')
  }

  const styles: AnyObject = {}
  if (props.fontSize) {
    styles.fontSize = calc(props.fontSize)
  }
  return (
    <div className={classes.join(' ')} style={styles}>
      <span className="unit">¥</span> { props.children }
    </div>
  )
}
