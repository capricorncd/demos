/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-12 14:43 (GMT+0900)
 */
import React from 'react'
import AppImage from '@/components/Common/AppImage'
import CountButtonGroup from '@/components/Common/CountButtonGroup'
import AppPrice from '@/components/Common/AppPrice'
import {ClickFunction, DefaultProps} from '@/types'
import welcomeCover from '~/temp/welcome.jpg'

interface TrendingItemProps extends DefaultProps {
  showDetail: ClickFunction;
  data: number;
}

export default function TrendingItem(props: TrendingItemProps): JSX.Element {
  return (
    <div className="home-trending-item shadow" onClick={props.showDetail}>
      <AppImage
        src={welcomeCover}
        height={100}/>
      <h4 className="ell">オジンオボックンオジンオボックン</h4>
      <div className="flex-space-between">
        <AppPrice>{ props.data + 1 + '00' }</AppPrice>
        <CountButtonGroup/>
      </div>
    </div>
  )
}
