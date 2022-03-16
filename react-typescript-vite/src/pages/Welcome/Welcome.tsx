/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-12 11:36 (GMT+0900)
 */
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AppButton from '@/components/Common/AppButton'
import './Welcome.scss'
import store, { dataSlice } from '@/stores'
import { request } from '@/helpers'
import { Apis, AppConstants } from '@/assets/constants'
import { AuthResponse, LanguageData, RootState } from '@/types'
import { useSelector } from 'react-redux'

export default function Welcome() {
  const languages = useSelector<RootState>((state) => state.data.languages) as LanguageData

  useEffect(() => {
    console.log('useEffect1')
    request
      .post<AuthResponse>(Apis.auth)
      .then((res) => {
        store.dispatch(dataSlice.actions.setBaseData(res))
      })
      .catch(() => {
        // @ts-ignore
        store.dispatch(dataSlice.actions.setBaseData({ status: AppConstants.authStatusUnauthorized }))
      })
  }, [])
  return (
    <Link to="/home" className="welcome-page flex-center">
      <img src={`./static/temp/welcome.jpg`} alt="" />
      <AppButton width="80%">{languages.buttonWelcome}</AppButton>
    </Link>
  )
}
