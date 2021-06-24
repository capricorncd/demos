/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-24 21:54 (GMT+0900)
 */
import React from 'react'
import {useHistory, useLocation} from 'react-router-dom'
import {useAuth} from '@/components/Common/UseAuth/UseAuth'
import './Login.scss'
import AppButton from "@/components/Common/AppButton";

export default function Login() {
  let history = useHistory();
  let location = useLocation();

  let auth = useAuth();

  // @ts-ignore
  let {from} = location.state || {from: {pathname: "/"}}

  async function login() {
    await auth.signIn();
    history.replace(from);
  }

  return (
    <div>
      <AppButton onClick={login}>Login</AppButton>
    </div>
  )
}
