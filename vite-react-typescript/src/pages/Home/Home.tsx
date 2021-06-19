/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-12 12:07 (GMT+0900)
 */
import React from 'react'
// import {Link} from 'react-router-dom'
import TopSwiper from "@/components/Home/TopSwiper";
import TrendingSwiper from '@/components/Home/TrendingSwiper'
import CategoryList from "@/components/Common/CategoryList";
import FooterBar from "@/components/Common/FooterBar/FooterBar";
import './Home.scss'

export default function Home() {
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
