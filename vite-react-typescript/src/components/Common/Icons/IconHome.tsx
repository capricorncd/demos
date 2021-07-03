/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-07-03 18:48 (GMT+0900)
 */
import React from 'react'
import {AnyObject, DefaultProps} from "@/types";
import {DEF_STYLES} from "@/assets/constants/Icons";

interface IconListProps extends DefaultProps {

}

export default function IconLogout(props: IconListProps) {
  const styles: AnyObject = {
    ...DEF_STYLES,
    ...props.style,
  }

  return (
    <svg className={props.className}
         style={styles}
         onClick={props.onClick}
         viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2730">
      <path
        d="M418.144 639.168h166.976a94.016 94.016 0 0 1 93.92 93.952v156.544c0 17.248 14.08 31.296 31.328 31.296h166.976a31.36 31.36 0 0 0 31.296-31.296V480.128a31.264 31.264 0 0 0-10.912-23.776L522.016 134.336a31.104 31.104 0 0 0-40.768 0L105.568 456.32a31.2 31.2 0 0 0-10.944 23.776v409.536a31.36 31.36 0 0 0 31.296 31.296h167.008a31.36 31.36 0 0 0 31.296-31.296V733.12a94.048 94.048 0 0 1 93.92-93.952z m459.2 344.416h-166.976a94.016 94.016 0 0 1-93.92-93.92V733.12a31.36 31.36 0 0 0-31.328-31.36h-166.976a31.36 31.36 0 0 0-31.296 31.36v156.544a94.048 94.048 0 0 1-93.92 93.92H125.92A94.048 94.048 0 0 1 32 889.664V480.128c0-27.456 11.968-53.472 32.8-71.36L440.512 86.816a93.44 93.44 0 0 1 122.272 0l375.712 322.016a93.888 93.888 0 0 1 32.768 71.328v409.536a94.016 94.016 0 0 1-93.92 93.92z"
        p-id="2731"></path>
    </svg>
  )
}
