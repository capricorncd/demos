/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-19 15:18 (GMT+0900)
 */
import React, { useState } from 'react'
import OrderList from "@/components/Common/OrderList/OrderList";
import './FooterBar.scss'
import {Link} from 'react-router-dom'

export default function FooterBar() {
  const [listVisible, setListVisible] = useState(false)

  function handleClick(): void {
    setListVisible(!listVisible)
  }

  return (
    <>
      <dl className={`footer-bar bg-primary shadow`} onClick={handleClick}>
        <dd className="shopping-cart flex-center fs20">
          {/*<svg className="icon mr4 small-text" style={{width: '1em', height: '1em', verticalAlign: 'middle', fill: 'currentColor', overflow: 'hidden'}}*/}
          {/*     viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1827">*/}
          {/*  <path*/}
          {/*    d="M932.68783 556.967144 932.68783 274.825252c0-16.020882-12.053524-29.007661-26.923186-29.007661l-652.037407-0.684592-25.382087-87.215364c-6.013971-20.665669-28.418236-32.651654-51.786457-28.729322l-78.534658 0c-20.169365 0-36.519752 23.223934-36.519752 51.872415 0 28.64848 16.349363 51.872415 36.519752 51.872415l51.961442 0 140.956336 484.33901c3.710508 12.750395 13.663184 22.195511 26.228361 26.644847 4.669346 2.00261 9.727549 3.107781 15.015995 3.107781l554.566468 0c23.438828 0 42.441625-21.535479 42.441625-48.101531 0-26.564006-19.001773-48.099485-42.441625-48.099485L667.228899 650.823765l238.536768-64.84896C920.634306 585.974805 932.68783 572.988026 932.68783 556.967144zM838.548776 519.1744 380.286678 649.481188c-4.114714 0-7.800663-1.943258-10.339486-5.01113l-89.163739-306.373783c1.308809-6.783497 6.885827-11.880585 13.571087-11.880585l544.051997 0.980327c7.656377 0 13.863752 6.687306 13.863752 14.937201l0.143263 162.106028C852.412528 512.487094 846.206176 519.1744 838.548776 519.1744zM409.784502 883.039571m-74.507948 0a72.811 72.811 0 1 0 149.015895 0 72.811 72.811 0 1 0-149.015895 0ZM791.736611 882.878912m-74.507948 0a72.811 72.811 0 1 0 149.015895 0 72.811 72.811 0 1 0-149.015895 0Z"*/}
          {/*    p-id="1828"></path>*/}
          {/*</svg>*/}
          <svg className="icon mb4 mr4" style={{width: '1em',height: '1em',verticalAlign: 'middle',fill: 'currentColor',overflow: 'hidden'}}
               viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5089">
            <path
              d="M0 938.67h1024V1024H0zM979.31 810.67C962.98 630.44 844.38 479.4 682.13 416.05 676.6 326.9 602.52 256 512 256s-164.6 70.9-170.13 160.05C179.62 479.4 61.02 630.44 44.69 810.67H0V896H1024v-85.33h-44.69zM512 341.33c34.05 0 63.27 20.18 76.95 49.08C563.9 386.26 538.21 384 512 384s-51.9 2.26-76.95 6.42c13.68-28.91 42.9-49.09 76.95-49.09zM130.35 810.67C151.65 618.94 314.69 469.33 512 469.33s360.35 149.6 381.65 341.33h-763.3z"
              fill="currentColor" p-id="5090"></path>
          </svg>
          <h2>89</h2>
        </dd>
        <dd className="pl10 color-white">
          <span className="small-text">¥</span> 900
        </dd>
        <Link to="/confirm" className={'flex-center btn-confirm'}>
          确定
          <svg className="icon" style={{width: '1em', height: '1em', verticalAlign: 'middle', fill: 'currentColor', overflow: 'hidden'}}
               viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="539">
            <path
              d="M351.36 896c-14.08 0-26.368-5.12-36.906667-15.274667-21.034667-20.394667-21.034667-52.693333 0-71.338666l284.458667-275.2L314.453333 257.28c-21.034667-20.352-21.034667-52.650667 0-71.338667 21.077333-20.352 54.442667-20.352 73.770667 0l321.28 312.576c21.077333 20.394667 21.077333 52.650667 0 71.338667L388.266667 880.725333a51.370667 51.370667 0 0 1-36.864 15.274667z"
              p-id="540"></path>
          </svg>
        </Link>
      </dl>
      <OrderList visible={listVisible} onClose={() => setListVisible(false)}/>
    </>
  )
}
