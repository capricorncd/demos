/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-12 17:45 (GMT+0900)
 */
import React, { useState } from 'react'
import AppImage from '@/components/Common/AppImage'
import CheckBox from '@/components/Common/CheckBox'
import AppButton from "@/components/Common/AppButton";
import AppPrice from "@/components/Common/AppPrice";
import AppTitle from "@/components/Common/AppTitle";
import CountButtonGroup from "@/components/Common/CountButtonGroup";
import {ClickFunction, DefaultProps} from "@/types";
import './index.scss'
import welcomeCover from '~/temp/welcome.jpg'

interface DetailProps extends DefaultProps {
  visible: boolean;
  onClose: ClickFunction;
}

const tags1 = Array.from({length: Math.round(Math.random() * 10) + 1}).map(() => {
  return {
    label: '飘香スペアリブ飘香ス'.slice(Math.round(Math.random() * 7)),
    price: Math.round(Math.random() * 1000),
  }
})
const tags2 = Array.from({length: Math.round(Math.random() * 10) + 1}).map(() => {
  return {
    label: '飘香スペアリブ飘香ス'.slice(Math.round(Math.random() * 7)),
    price: Math.round(Math.random() * 1000),
  }
})
const tags3 = Array.from({length: Math.round(Math.random() * 10) + 1}).map(() => {
  return {
    label: '飘香スペアリブ飘香ス'.slice(Math.round(Math.random() * 7)),
    price: Math.round(Math.random() * 1000),
  }
})

export default function DetailPopup(props: DetailProps) {
  const [isInitialed, setIsInitialed] = useState(false)
  const [plusItems, setPlusItems] = useState(['飘香スペアリブ', '飘香スペアリ', '飘香スペアリブ', '飘香スペアリ', 'ブ飘香ス', 'ペアリブ', '飘香ス', 'ペアリ', 'ブ飘香スペア', 'リブ飘香スペア'])

  const classes: string[] = ['common-popup', 'detail-popup', 'fixed-full']

  if (props.visible) {
    classes.push('fade-in')
    if (!isInitialed) setIsInitialed(true)
  } else if (isInitialed) {
    classes.push('fade-out')
  }

  function handleClose(e: React.MouseEvent): void {
    console.log('handleClose');
    e.stopPropagation()
    props.onClose(e)
  }

  return (
    <section className={classes.join(' ')}>
      <section className="common-popup__inner shadow">
        <button className="close" onClick={handleClose}/>
        <dl className="header">
          <AppImage className="cover" src={welcomeCover}/>
          <dt className="ell mt10">飘香スペアリブ飘香スペアリブ飘香スペアリブ</dt>
          <dd className="ell mt8">飘香小排</dd>
        </dl>

        <div className="body">
          <AppTitle/>
          {
            tags1.map((v, k) => (
              <CheckBox key={k} data={v}/>
            ))
          }
          <AppTitle/>
          {
            tags2.map((v, k) => (
              <CheckBox key={k} data={v}/>
            ))
          }
          <AppTitle/>
          {
            tags3.map((v, k) => (
              <CheckBox key={k} data={v}/>
            ))
          }

          <div className="detail-content gray">
            <div>飘香スペアリブ飘香スペアリブ飘香スペアリブ、飘香スペアリブ飘香スペアリブ飘香スペアリブ飘香スペアリブ飘香スペアリブ飘香スペアリブ。</div>
            <img src={welcomeCover} alt=""/>
          </div>
        </div>

        <div className="footer">
          <AppPrice fontSize={24} primary>2300</AppPrice>
          <div className="plus-items gray">{plusItems.join('、')}</div>
          {/*<AppButton width={240} small onClick={props.onClose}>はい</AppButton>*/}
          <CountButtonGroup className="btn-count"/>
        </div>
      </section>
    </section>
  )
}
