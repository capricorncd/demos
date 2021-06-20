/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-20 19:08 (GMT+0900)
 */
import React from 'react'
import './AppLabel.scss'
import {DefaultProps} from "@/types";

interface AppLabelProps extends DefaultProps {
  name?: string | number;
  right?: React.ReactNode;
}

export default function AppLabel(props: AppLabelProps) {
  const classes = ['app-label', 'col or-gray']
  if (props.className) classes.push(props.className)

  return (
    <dl className={classes.join(' ')}>
      <dt>
        <div className={`ell`}>{props.name}</div>
        <div className="right">{ props.right }</div>
      </dt>
      <dd className={`color-gray`}>{props.children}</dd>
    </dl>
  )
}
