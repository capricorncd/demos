/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-19 21:43 (GMT+0900)
 */
import React from 'react'
import { DEF_STYLES } from '@/assets/constants/Icons'
import {AnyObject, DefaultProps} from '@/types'

interface IconShoppingCartProps extends DefaultProps {

}

export default function IconShoppingCart(props: IconShoppingCartProps) {
  const styles: AnyObject = {
    ...DEF_STYLES,
  }
  return (
    <svg className={props.className}
         style={styles}
         onClick={props.onClick}
         viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1827">
      <path
        d="M932.68783 556.967144 932.68783 274.825252c0-16.020882-12.053524-29.007661-26.923186-29.007661l-652.037407-0.684592-25.382087-87.215364c-6.013971-20.665669-28.418236-32.651654-51.786457-28.729322l-78.534658 0c-20.169365 0-36.519752 23.223934-36.519752 51.872415 0 28.64848 16.349363 51.872415 36.519752 51.872415l51.961442 0 140.956336 484.33901c3.710508 12.750395 13.663184 22.195511 26.228361 26.644847 4.669346 2.00261 9.727549 3.107781 15.015995 3.107781l554.566468 0c23.438828 0 42.441625-21.535479 42.441625-48.101531 0-26.564006-19.001773-48.099485-42.441625-48.099485L667.228899 650.823765l238.536768-64.84896C920.634306 585.974805 932.68783 572.988026 932.68783 556.967144zM838.548776 519.1744 380.286678 649.481188c-4.114714 0-7.800663-1.943258-10.339486-5.01113l-89.163739-306.373783c1.308809-6.783497 6.885827-11.880585 13.571087-11.880585l544.051997 0.980327c7.656377 0 13.863752 6.687306 13.863752 14.937201l0.143263 162.106028C852.412528 512.487094 846.206176 519.1744 838.548776 519.1744zM409.784502 883.039571m-74.507948 0a72.811 72.811 0 1 0 149.015895 0 72.811 72.811 0 1 0-149.015895 0ZM791.736611 882.878912m-74.507948 0a72.811 72.811 0 1 0 149.015895 0 72.811 72.811 0 1 0-149.015895 0Z"
        p-id="1828"></path>
    </svg>
  )
}
