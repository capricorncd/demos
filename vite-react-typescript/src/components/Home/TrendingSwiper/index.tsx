/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-12 14:39 (GMT+0900)
 */
import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import TrendingItem from './TrendingItem'
import { FoodDetail, RootState, StoreDataFoods } from '@/types'
import './index.scss'
import DetailPopup from '@/components/DetailPopup'
import { useSelector } from 'react-redux'

export default function TrendingSwiper() {
  const foods = useSelector<RootState>((state) => state.data.foods) as StoreDataFoods
  const trendingList = useSelector<RootState>((state) => state.data.trendingList) as number[]

  const list: FoodDetail[] = trendingList.map((id) => foods[id])

  const [detailVisible, setDetailVisible] = useState(false)
  const [selectedItem, setSelectedItem] = useState<FoodDetail | null>(null)

  function handleClick(item: FoodDetail): void {
    setSelectedItem(item)
    setDetailVisible(true)
  }

  return list.length ? (
    <div className="home-trending-swiper">
      <Swiper spaceBetween={10} slidesPerView="auto">
        {list.map((item, i) => (
          <SwiperSlide key={i}>
            <TrendingItem data={item} onClick={() => handleClick(item)} />
          </SwiperSlide>
        ))}
      </Swiper>

      {selectedItem ? (
        <DetailPopup foodId={selectedItem.id} visible={detailVisible} onClose={() => setDetailVisible(false)} />
      ) : null}
    </div>
  ) : null
}
