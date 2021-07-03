/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-12 14:39 (GMT+0900)
 */
import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import TrendingItem from './TrendingItem'
import {DefaultProps, FoodDetail} from '@/types'
import './index.scss'
import DetailPopup from '@/components/DetailPopup'

interface TrendingSwiperProps extends DefaultProps {
}

export default function TrendingSwiper(props: TrendingSwiperProps) {
  const [detailVisible, setDetailVisible] = useState(false)
  return (
    <div className="home-trending-swiper">
      <Swiper
        spaceBetween={10}
        slidesPerView="auto"
      >
        {Array.from({length: 20}).map((item, i) => (
          <SwiperSlide key={i}>
            <TrendingItem index={i} showDetail={() => setDetailVisible(true)}/>
          </SwiperSlide>
        ))}
      </Swiper>

      <DetailPopup data={{} as FoodDetail} visible={detailVisible} onClose={() => setDetailVisible(false)}/>
    </div>
  )
}
