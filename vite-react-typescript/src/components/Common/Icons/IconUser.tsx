/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-21 21:04 (GMT+0900)
 */
import React from 'react'
import {AnyObject, DefaultProps} from '@/types'
import {DEF_STYLES} from '@/assets/constants/Icons'

interface IconUserProps extends DefaultProps {

}

export default function IconUser(props: IconUserProps) {
  const styles: AnyObject = {
    ...DEF_STYLES,
    ...props.styles,
  }

  return (
    <svg className={props.className}
         style={styles}
         onClick={props.onClick}
         viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1389">
      <path
        d="M691.2 608c-57.4 0-85 32-179.2 32-94.2 0-121.6-32-179.2-32C184.4 608 64 728.4 64 876.8V928c0 53 43 96 96 96h704c53 0 96-43 96-96v-51.2c0-148.4-120.4-268.8-268.8-268.8zM864 928H160v-51.2c0-95.2 77.6-172.8 172.8-172.8 29.2 0 76.6 32 179.2 32 103.4 0 149.8-32 179.2-32 95.2 0 172.8 77.6 172.8 172.8V928zM512 576c159 0 288-129 288-288S671 0 512 0 224 129 224 288s129 288 288 288z m0-480c105.8 0 192 86.2 192 192s-86.2 192-192 192-192-86.2-192-192 86.2-192 192-192z"
        fill="currentColor" p-id="1390"></path>
    </svg>
  )
}
