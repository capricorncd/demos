/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-12 15:03 (GMT+0900)
 */
import React from 'react'
import { calc } from '../../../helpers'
import './index.scss'

export interface AppImageProps {
  src: string
  height?: number
  inlineFlex?: boolean
  className?: string
}

export default function AppImage(props: AppImageProps) {
  const styles: Record<string, string | number> = {}
  if (props.height) {
    styles.height = calc(props.height)
  }

  const classes = ['app-image']
  if (props.inlineFlex) {
    classes.push('inline-flex')
  }
  if (props.className) {
    classes.push(props.className)
  }

  return (
    <div className={classes.join(' ')} style={styles}>
      <img src={props.src} alt="" />
    </div>
  )
}
