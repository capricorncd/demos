/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-21 19:38 (GMT+0900)
 */
import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import './SideBar.scss'
import {ClickFunction, DefaultProps} from '@/types'
import {IconArrow, IconList, IconUser} from '@/components/Common/Icons'
import { useAuth } from '@/components/Common/UseAuth/UseAuth'

interface SideBarProps extends DefaultProps {
  visible: boolean;
  onClose: ClickFunction;
}

export default function SideBar(props: SideBarProps) {
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

  const history = useHistory()
  const auth = useAuth()

  function handleClick(path: string): void {
    history.push(path)
  }

  async function logout(): Promise<void> {
    await auth.signOut()
    history.replace('/')
  }

  return (
    <>
      <section className={innerClasses.join(' ')}>
        <ul className="menu-list">
          <li onClick={() => handleClick('/home')}>
            <div className="flex-center"><IconUser/></div>
            个人中心
          </li>
          <li onClick={() => handleClick("/order/detail/0")}>
            <div className="flex-center"><IconList/></div>
            最新订单
          </li>
          <li onClick={logout}>
            <div className="flex-center"><IconList/></div>
            退出登录
          </li>
          {/*<Link to="/order/history">历史订单</Link>*/}
        </ul>
        <div className="footer-item" onClick={props.onClose}>
          <div className="back">
            <IconArrow left/>
          </div>
          <div className={`fs14 ml10 color-gray`}>返回</div>
        </div>
      </section>
      <section className={maskClasses.join(' ')} onClick={props.onClose}/>
    </>
  )
}
