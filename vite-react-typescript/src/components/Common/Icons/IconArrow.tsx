/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-19 21:04 (GMT+0900)
 */
import React from 'react'
import { AnyObject, DefaultProps } from '@/types'
import { DEF_STYLES } from '@/assets/constants/Icons'

interface IconArrowProps extends DefaultProps {
  styles?: AnyObject
  up?: boolean
  right?: boolean
  down?: boolean
  left?: boolean
}

export default function IconArrow(props: IconArrowProps) {
  const styles: AnyObject = {
    ...DEF_STYLES,
    ...props.style,
  }
  if (props.up) styles.transform = `rotate(-90deg)`
  if (props.down) styles.transform = `rotate(90deg)`
  if (props.left) styles.transform = `rotate(180deg)`

  return (
    <svg
      className={props.className}
      style={styles}
      onClick={props.onClick}
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="539">
      <path
        d="M351.36 896c-14.08 0-26.368-5.12-36.906667-15.274667-21.034667-20.394667-21.034667-52.693333 0-71.338666l284.458667-275.2L314.453333 257.28c-21.034667-20.352-21.034667-52.650667 0-71.338667 21.077333-20.352 54.442667-20.352 73.770667 0l321.28 312.576c21.077333 20.394667 21.077333 52.650667 0 71.338667L388.266667 880.725333a51.370667 51.370667 0 0 1-36.864 15.274667z"
        p-id="540"></path>
    </svg>
  )
}
