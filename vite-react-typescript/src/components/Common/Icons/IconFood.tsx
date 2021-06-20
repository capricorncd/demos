/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-19 21:46 (GMT+0900)
 */
import React from 'react'
import {AnyObject, DefaultProps} from "@/types";
import { DEF_STYLES } from "@/assets/constants/Icons";

interface IconFoodProps extends DefaultProps {

}

export default function IconFood(props: IconFoodProps) {
  const styles: AnyObject = {
    ...DEF_STYLES,
    ...props.styles,
  }
  return (
    <svg className={props.className}
         style={styles}
         onClick={props.onClick}
         viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5089">
      <path
        d="M0 938.67h1024V1024H0zM979.31 810.67C962.98 630.44 844.38 479.4 682.13 416.05 676.6 326.9 602.52 256 512 256s-164.6 70.9-170.13 160.05C179.62 479.4 61.02 630.44 44.69 810.67H0V896H1024v-85.33h-44.69zM512 341.33c34.05 0 63.27 20.18 76.95 49.08C563.9 386.26 538.21 384 512 384s-51.9 2.26-76.95 6.42c13.68-28.91 42.9-49.09 76.95-49.09zM130.35 810.67C151.65 618.94 314.69 469.33 512 469.33s360.35 149.6 381.65 341.33h-763.3z"
        fill="currentColor" p-id="5090"></path>
    </svg>
  )
}
