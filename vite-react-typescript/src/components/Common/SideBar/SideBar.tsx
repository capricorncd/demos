/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-21 19:38 (GMT+0900)
 */
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ClickFunction, DefaultProps, LanguageData, RootState } from '@/types'
import { IconArrow, IconList, IconHome, IconLogout, IconLanguage, IconClear } from '@/components/Common/Icons'
import { useAuth } from '@/components/UseAuth/UseAuth'
import { isUrlLike, setBodyScrollStatus, clearCache } from '@/helpers'
// import {getLanguageList} from '@/assets/constants'
import './SideBar.scss'

interface SideBarProps extends DefaultProps {
  visible: boolean
  onClose: ClickFunction
}

export default function SideBar(props: SideBarProps) {
  const languages = useSelector<RootState>((state) => state.data.languages) as LanguageData
  const [isInitialed, setIsInitialed] = useState(false)

  const maskClasses = ['common-side-bar__mask']
  const innerClasses = ['common-side-bar__inner']

  if (props.visible) {
    maskClasses.push('fade-in')
    innerClasses.push('slide-in-left')
    if (!isInitialed) setIsInitialed(true)
  } else if (isInitialed) {
    maskClasses.push('fade-out')
    innerClasses.push('slide-out-left')
  }

  useEffect(() => {
    setBodyScrollStatus(props.visible)
  }, [props.visible])

  const history = useHistory()
  const auth = useAuth()

  function handleClick(path: string): void {
    // clear cache
    if (path === 'clearCache') {
      clearCache()
      location.reload()
      return
    }
    // language
    if (path === 'language') {
      // open language choice popup
      alert('open language choice popup')
      return
    }
    if (isUrlLike(path)) {
      location.href = path
    } else {
      history.push(path)
    }
  }

  async function logout(): Promise<void> {
    await auth.signOut()
    history.replace('/')
  }

  return (
    <>
      <section className={innerClasses.join(' ')}>
        <ul className="menu-list">
          <li onClick={() => handleClick('/')}>
            <div className="flex-center">
              <IconHome />
            </div>
            欢迎页
          </li>
          <li onClick={() => handleClick('/order/history')}>
            <div className="flex-center">
              <IconList />
            </div>
            历史订单
          </li>
          <li onClick={() => handleClick('clearCache')}>
            <div className="flex-center">
              <IconClear />
            </div>
            清除缓存
          </li>
          <li onClick={() => handleClick('language')}>
            <div className="flex-center">
              <IconLanguage />
            </div>
            {languages.language}
          </li>
          <li onClick={logout}>
            <div className="flex-center">
              <IconLogout />
            </div>
            退出登录
          </li>
          {/*<Link to="/order/history">历史订单</Link>*/}
        </ul>
        <div className="footer-item" onClick={props.onClose}>
          <div className="back">
            <IconArrow left />
          </div>
          <div className={`fs14 ml10 color-gray`}>返回</div>
        </div>
      </section>
      <section className={maskClasses.join(' ')} onClick={props.onClose} />
    </>
  )
}
