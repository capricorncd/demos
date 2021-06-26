/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-12 12:07 (GMT+0900)
 */
import React, { useState, useEffect } from 'react'
// import {Link} from 'react-router-dom'
import TopSwiper from '@/components/Home/TopSwiper'
import TrendingSwiper from '@/components/Home/TrendingSwiper'
import CategoryList from '@/components/Common/CategoryList'
import FooterBar from '@/components/Common/FooterBar/FooterBar'
import { request } from '@/helpers'
import './Home.scss'
import {AnyObject} from "@/types";

export default function Home() {
  const [data, setData] = useState<AnyObject>({})
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    request<AnyObject>('').then(res => {
      console.log(res);
      setData(res)
    }).catch(err => {
      console.log(err);
    })
  }, [])

  return (
    <div className="home-page">
      <h4 className="mt10 ml10">Trending</h4>
      <TrendingSwiper/>
      <CategoryList className={`mt10`}>
        <TopSwiper/>
      </CategoryList>
      <FooterBar/>
    </div>
  )
}
