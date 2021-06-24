/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-24 21:16 (GMT+0900)
 */
import React, { useState, useContext, createContext } from 'react'
import {DefaultProps} from "@/types";
import { setCache, removeCache, getCache } from "@/helpers";
import App from '@/assets/constants/App'

export interface UserInfo {
  userName: string;
  userId: number;
}

export interface CommonResponseData {
  code: number;
  message: string;
}

export interface UseAuth {
  user: UserInfo | null;
  signIn: () => Promise<UserInfo>,
  signOut: () => Promise<CommonResponseData>,
}

const AuthContext = createContext<UseAuth>({} as UseAuth)

export function ProvideAuth({children}: DefaultProps) {
  const auth = useProvideAuth()
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export function useAuth(): UseAuth {
  return useContext(AuthContext)
}

export function useProvideAuth(): UseAuth {
  const [user, setUser] = useState<UserInfo | null>(getCache(App.userInfoKey))

  async function signIn(): Promise<UserInfo> {
    await setTimeout(() => {
      console.log('signIn');
    }, 1000)
    const data = {
      userName: "HaniKzy",
      userId: 10002,
    }
    setCache(App.userInfoKey, data)
    setUser(data)
    return data
  }

  async function signOut(): Promise<CommonResponseData> {
    await setTimeout(() => {
      console.log('signOut');
    })
    const data = {
      code: 0,
      message: 'success'
    }
    setUser(null)
    removeCache(App.userInfoKey)
    return data
  }

  return {
    user,
    signIn,
    signOut,
  }
}