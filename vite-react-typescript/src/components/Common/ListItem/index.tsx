/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-13 12:09 (GMT+0900)
 */
import React, {useState} from 'react'
import './index.scss'
import {DefaultProps} from '@/types'
import {getClasses} from '@/helpers'
import AppImage from '@/components/Common/AppImage'
import AppPrice from '@/components/Common/AppPrice'
import CountButtonGroup from '@/components/Common/CountButtonGroup'
import imgPath from '~/temp/welcome.jpg'

interface ListItemProps extends DefaultProps {
}

export default function ListItem(props: ListItemProps) {
  const classes = getClasses('common-list-item', props.className)

  return (
    <section className={classes} onClick={props.onClick}>
      <AppImage src={imgPath}/>
      <dl className="list-item__info">
        <dd>
          <h4 className="ell">菜品/饮品等名称菜品/饮品等名称菜品/饮品等名称</h4>
          <p className="fs12 color-gray">二级名称或其他语言名称</p>
          <p className="fs12 color-gray">说明内容等等</p>
        </dd>
        <dd className="flex-space-between" onClick={(e) => e.stopPropagation()}>
          <AppPrice>900</AppPrice>
          <CountButtonGroup/>
        </dd>
      </dl>
    </section>
  )
}
