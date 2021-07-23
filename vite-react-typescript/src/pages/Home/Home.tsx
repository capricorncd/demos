/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-12 12:07 (GMT+0900)
 */
import React, { useState, useEffect } from 'react'
// import {Link} from 'react-router-dom'
import TopSwiper from '@/components/Home/TopSwiper'
import TrendingSwiper from '@/components/Home/TrendingSwiper'
import CategoryList from '@/components/Home/CategoryList'
import FooterBar from '@/components/Home/FooterBar/FooterBar'
import { request, getCache, setCache } from '@/helpers'
import { HomeResponse } from '@/types'
import { Apis, CacheKeys } from '@/assets/constants'
import store, { dataSlice } from '@/stores'
import Loading from '@/components/Common/Loading/Loading'
import './Home.scss'

export default function Home() {
  const [data, setData] = useState<HomeResponse | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    function init(data: HomeResponse, doNotCache = false): void {
      setData(data)
      setIsLoaded(true)
      if (!doNotCache) setCache(CacheKeys.homeApiData, data)
      store.dispatch(dataSlice.actions.update(data))
    }
    const cache: HomeResponse | null = getCache(CacheKeys.homeApiData)
    if (cache) {
      init(cache, true)
      return
    }

    request
      .get<HomeResponse>(Apis.home)
      .then(init)
      .catch((err) => {
        console.error(err)
      })
  }, [])

  if (!isLoaded) {
    return <Loading />
  }

  return data ? (
    <div className="home-page">
      <h4 className="mt10 ml10">Trending</h4>
      <TrendingSwiper />
      <CategoryList className={`mt10`} data={data}>
        <TopSwiper />
      </CategoryList>
      <FooterBar data={data} />
    </div>
  ) : null
}
