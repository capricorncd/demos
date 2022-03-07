/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-24 21:16 (GMT+0900)
 */
import React, { useState, useContext, createContext } from 'react'
import { DefaultProps } from '@/types'

export interface UserInfo {
  userName: string
  userId: number
}

export interface CommonResponseData {
  code: number
  message: string
}

export interface UseAuth {
  user: UserInfo | null
  signIn: () => Promise<UserInfo>
  signOut: () => Promise<CommonResponseData>
}

const AuthContext = createContext<UseAuth>({} as UseAuth)

export function ProvideAuth({ children }: DefaultProps) {
  const auth = useProvideAuth()
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export function useAuth(): UseAuth {
  return useContext(AuthContext)
}

function asyncFun(): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, 1000)
  })
}

export function useProvideAuth(): UseAuth {
  const [user, setUser] = useState<UserInfo | null>(null)

  async function signIn(): Promise<UserInfo> {
    await asyncFun()
    console.log('signIn')
    const data = {
      userName: 'Capricorncd',
      userId: 9527,
    }
    setUser(data)
    return data
  }

  async function signOut(): Promise<CommonResponseData> {
    await asyncFun()
    console.log('signOut')
    const data = {
      code: 0,
      message: 'success',
    }
    setUser(null)
    return data
  }

  return {
    user,
    signIn,
    signOut,
  }
}
