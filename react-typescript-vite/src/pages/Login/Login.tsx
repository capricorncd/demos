/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-24 21:54 (GMT+0900)
 */
import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useAuth } from '@/components/UseAuth/UseAuth'
import './Login.scss'
import AppButton from '@/components/Common/AppButton'

export default function Login() {
  const [disabled, setDisabled] = useState(false)
  const history = useHistory()
  const location = useLocation()

  const auth = useAuth()

  // @ts-ignore
  const { from } = location.state || { from: { pathname: '/' } }

  async function login() {
    setDisabled(true)
    await auth.signIn()
    history.replace(from)
  }

  return (
    <div className="mt50">
      <AppButton onClick={login} disabled={disabled} width={`80%`}>
        {disabled ? 'Login ...' : 'Login'}
      </AppButton>
    </div>
  )
}
