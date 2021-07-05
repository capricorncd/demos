/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-07-05 21:49 (GMT+0900)
 */
import React, { useState, useEffect } from 'react'
import AppImage from '@/components/Common/AppImage'
import AppButton from '@/components/Common/AppButton'
import {
  ClickFunction,
  DefaultProps,
} from '@/types'
import { setBodyScrollStatus } from '@/helpers'
import './index.scss'

interface RemarkInputProps extends DefaultProps {
  visible: boolean;
  onClose: ClickFunction;
  change: (text: string) => void;
  value: string;
}

export default function DetailPopup(props: RemarkInputProps) {
  const [input, setInput] = useState(props.value)
  const [isInitialed, setIsInitialed] = useState(false)

  const classes: string[] = ['common-popup', 'remark-input-popup', 'fixed-full']

  if (props.visible) {
    classes.push('fade-in')
    if (!isInitialed) setIsInitialed(true)
  } else if (isInitialed) {
    classes.push('fade-out')
  }

  useEffect(() => {
    setBodyScrollStatus(props.visible)
  }, [props.visible])

  function handleClose(e: React.MouseEvent): void {
    e.stopPropagation()
    props.onClose(e)
  }


  function handleInput(e: React.FormEvent<HTMLTextAreaElement>): void {
    setInput(e.currentTarget.value)
  }

  return (
    <section className={classes.join(' ')}>
      <section className="common-popup__inner shadow">
        <button className="close" onClick={handleClose}/>
        <dl className="header">
          <AppImage className="cover" src={`data.cover`}/>
          <dt className="mt10">备注说明</dt>
          <dd className="mt4">--</dd>
        </dl>

        <div className="body">
          <textarea value={input} rows={10} onInput={handleInput} placeholder={`请输入备注信息...`}/>
        </div>

        <div className="footer flex-end">
          <AppButton onClick={() => props.change(input)} width={100} inline>确定</AppButton>
        </div>
      </section>
    </section>
  )
}
