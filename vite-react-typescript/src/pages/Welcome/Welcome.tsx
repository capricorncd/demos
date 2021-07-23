/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-12 11:36 (GMT+0900)
 */
import React from 'react'
import { Link } from 'react-router-dom'
import AppButton from '@/components/Common/AppButton'
import './Welcome.scss'

export default function Welcome() {
  return (
    <Link to="/home" className="welcome-page flex-center">
      <img src={`./static/temp/welcome.jpg`} alt="" />
      <AppButton width="80%">注文を始めましょう！</AppButton>
    </Link>
  )
}
