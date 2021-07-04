/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-19 21:32 (GMT+0900)
 */
import React from 'react'
import {AnyObject, DefaultProps} from '@/types'
import {DEF_STYLES} from '@/assets/constants/Icons'

interface IconListProps extends DefaultProps {
  type?: number;
}
export default function IconList(props: IconListProps) {
  const styles: AnyObject = {
    ...DEF_STYLES,
    ...props.style,
  }

  switch (props.type) {
    case 1:
      return (
        <svg
          className={props.className}
          style={styles}
          onClick={props.onClick}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 40 40"
        >
  <path opacity="0.2" fill="currentColor" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
      s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
      c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"></path>
          <path fill="currentColor" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
      C22.32,8.481,24.301,9.057,26.013,10.047z" transform="rotate(42.1171 20 20)">
      <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 20 20" to="360 20 20" dur="1.5s" repeatCount="indefinite"></animateTransform>
  </path>
</svg>
      )
    case 2:
      return (
        <svg
          className={props.className}
          style={styles}
          onClick={props.onClick}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 50 50"
        >
            <path fill="currentColor" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z" transform="rotate(275.098 25 25)">
                <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="2.6s" repeatCount="indefinite"></animateTransform>
            </path>
        </svg>
      )
    default:
      return (
        <svg
          className={props.className}
          style={styles}
          onClick={props.onClick}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 50 50"
        >
          <path fill="currentColor" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z" transform="rotate(275.098 25 25)">
        <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite"></animateTransform>
    </path>
        </svg>
      )
  }
}
