/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-07-04 15:16 (GMT+0900)
 */
import React from 'react'
import {DefaultProps} from '@/types'
import { IconLoading } from '@/components/Common/Icons'
import './Loading.scss'

interface LoadingProps extends DefaultProps {

}

export default function Loading(props: LoadingProps) {
  const classes = ['common-loading-modal', 'color-primary']
  if (props.className) classes.push(props.className)
  return (
    <div className={classes.join(' ')}>
      <IconLoading type={1} style={{fontSize: '5em'}}/>
    </div>
  )
}
