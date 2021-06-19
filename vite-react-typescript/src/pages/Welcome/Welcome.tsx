/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-12 11:36 (GMT+0900)
 */
import React from 'react'
import {Link} from 'react-router-dom'
import AppButton from "@/components/Common/AppButton";
import './Welcome.scss'
import welcomeCover from '~/temp/welcome.jpg'

function Welcome() {
  return (
    <Link to="/home" className="welcome-page flex-center">
      <img src={welcomeCover} alt=""/>
      <AppButton width="80%">注文を始めましょう！</AppButton>
    </Link>
  )
}

export default Welcome
