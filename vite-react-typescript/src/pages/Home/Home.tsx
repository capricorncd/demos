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
import {HomeResponse} from '@/types'
import App from '@/assets/constants/App'

export default function Home() {
  const [data, setData] = useState<HomeResponse | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    request.get<HomeResponse>(App.apis.GITHUB_USER).then(res => {
      console.log(res);
      setData(res)
      setIsLoaded(true)
    }).catch(err => {
      console.error(err);
    })
  }, [])

  return data ? (
    <div className="home-page">
      <h4 className="mt10 ml10">Trending</h4>
      <TrendingSwiper/>
      <CategoryList className={`mt10`}>
        <TopSwiper/>
      </CategoryList>
      <FooterBar data={data}/>
    </div>
  ) : null
}
