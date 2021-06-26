/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-20 15:31 (GMT+0900)
 */
import React from 'react'
import {Link} from 'react-router-dom'
import IconArrow from '@/components/Common/Icons/IconArrow'
import {DefaultProps} from '@/types'
import './Header.scss'

interface HeaderProps extends DefaultProps {
  backPath?: string;
  rightChildren?: React.ReactNode;
}

export default function Header(props: HeaderProps) {
  const classes = ['common-header bg-primary color-white']
  if (props.className) classes.push(props.className)
  return (
    <header className={classes.join(' ')}>
      <Link to={props.backPath || '/home'} className="back flex-center">
        <IconArrow left className="icon color-white"/>
      </Link>
      <h4>店铺名称</h4>
      <p className="fs12">桌号 8</p>
      <div className="top-right-wrapper">{props.rightChildren}</div>
    </header>
  )
}
