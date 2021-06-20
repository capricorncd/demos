/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-20 19:08 (GMT+0900)
 */
import React from 'react'
import './AppLabel.scss'
import {AnyObject, DefaultProps} from "@/types";
import {calc} from "@/helpers";

interface AppLabelProps extends DefaultProps {
  name?: string | number;
  // labelWidth?: string | number;
}

export default function AppLabel(props: AppLabelProps) {
  const classes = ['app-label', 'col or-gray']
  if (props.className) classes.push(props.className)
  // const labelStyles: AnyObject = {}
  // if (props.labelWidth) labelStyles.width = `0 0 ${calc(props.labelWidth)}`

  return (
    <dl className={classes.join(' ')}>
      <dt>{props.name}</dt>
      <dd className={`color-gray`}>{props.children}</dd>
    </dl>
  )
}
