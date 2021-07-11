/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-12 22:51 (GMT+0900)
 */
import React, {useState, useEffect, useRef} from 'react'
import './index.scss'
import {AnyObject, CategoryItem, DefaultProps, FoodDetail, HomeResponse} from '@/types'
import {getClasses, $} from '@/helpers'
import ListItem from '@/components/Common/ListItem'
import DetailPopup from '@/components/DetailPopup'
import { positionHandler } from './positionHandler'

const HEIGHT_OFFSET = 0

interface CategoryListProps extends DefaultProps {
  data: HomeResponse;
}

let isMenuClick = false

export default function CategoryList(props: CategoryListProps) {
  const classes = getClasses('category-list', props.className)
  const [winHeight, setWinHeight] = useState(window.innerHeight - HEIGHT_OFFSET)
  const [index, setIndex] = useState(0)
  const [detailVisible, setDetailVisible] = useState(false)
  const [selectItemId, setSelectItemId] = useState<number>(0)

  const listRef = useRef(null)

  useEffect(() => {
    // @ts-ignore
    const listEl: HTMLElement = listRef.current

    const sideEl = $('.side', listEl)[0]
    const sideElOffsetTop = sideEl.offsetTop
    const sideLisInfo = $('li', sideEl).map(el => {
      return el.offsetTop - sideElOffsetTop
    })
    const contentEl = $('.content', listEl)[0]
    const contentElOffsetTop = contentEl.offsetTop

    let lis: HTMLElement[]
    let tempIndex: number
    contentEl.addEventListener('scroll', () => {
      if (isMenuClick) return;
      lis = $('li', contentEl)
      for (let i = 0; i < lis.length; i++) {
        if (lis[i].offsetTop - contentElOffsetTop > contentEl.scrollTop + 50) {
          tempIndex = Math.max(i - 1, 0)
          setIndex(tempIndex)
          sideEl.scrollTop = sideLisInfo[tempIndex]
          break
        }
      }
    })

    // resize
    window.addEventListener('resize', () => {
      setWinHeight(window.innerHeight - HEIGHT_OFFSET)
    })
  }, [])

  const styles: AnyObject = {
    height: winHeight + 'px',
  }

  function changeIndex(i: number): void {
    if (i === index) return
    isMenuClick = true
    setIndex(i)
    // @ts-ignore
    positionHandler($('.content', listRef.current)[0], i, () => isMenuClick = false)
  }

  const categories: CategoryItem[] = props.data.categories.slice(0)

  if (props.children) {
    categories.unshift({
      id: 0,
      name: '推荐',
      sub_name: '',
    })
  }

  const foods: Record<string, FoodDetail[]> = {}
  props.data.food_list.forEach(item => {
    if (!foods[item.category_id]) {
      foods[item.category_id] = []
    }
    foods[item.category_id].push(item)
  })

  return (
    <section className={classes} style={styles} ref={listRef}>
      <ul className="side bg">
        {
          categories.map((item, i) => (
            <li
              className={index === i ? 'active' : ''}
              key={i}
              onClick={() => changeIndex(i)}>
              { item.name }
            </li>
          ))
        }
        <div className="blank"/>
      </ul>
      <ul className="content">
        { props.children ? (<li>{ props.children  }</li>) : null }
        {
          categories.map((v, i) => foods[v.id] ? (
            <li key={i} data-index={i}>
              <h5 className="mt15">{v.name}</h5>
              {
                foods[v.id].map((item, j) => (
                  <ListItem data={item} key={j} onClick={
                    () => {
                      setSelectItemId(item.id)
                      setDetailVisible(true)
                    }
                  }/>
                ))
              }
            </li>
          ) : null)
        }
      </ul>
      <DetailPopup
        foodId={selectItemId}
        visible={detailVisible}
        onClose={() => setDetailVisible(false)}/>
    </section>
  )
}
