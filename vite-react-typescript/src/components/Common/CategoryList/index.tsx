/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-12 22:51 (GMT+0900)
 */
import React, {useState, useEffect, useRef} from 'react'
import './index.scss'
import {AnyObject, DefaultProps} from "@/types";
import {getClasses, $} from "@/helpers";
import ListItem from "@/components/Common/ListItem";
import DetailPopup from "@/components/DetailPopup";
import { positionHandler } from './positionHandler'

const HEIGHT_OFFSET = 0

interface CategoryListProps extends DefaultProps {

}

const list = Array.from({length: 30}).map((v, i) => {
  return {
    categoryId: i + 1,
    categoryName: i + '分类名称分类名称分类名称'.slice(0, Math.round(Math.random() * 10)),
    list: Array.from({length: Math.round(Math.random() * 10) || 1})
  }
})

let isMenuClick = false

export default function CategoryList(props: CategoryListProps) {
  const classes = getClasses('category-list', props.className)
  const [winHeight, setWinHeight] = useState(window.innerHeight - HEIGHT_OFFSET)
  const [index, setIndex] = useState(0)
  const [detailVisible, setDetailVisible] = useState(false)

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
        if (lis[i].offsetTop - contentElOffsetTop > contentEl.scrollTop + 50 && tempIndex !== index) {
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

  if (props.children && list[0].categoryName !== '推荐') list.unshift({
    categoryName: '推荐',
    categoryId: 0,
    list: []
  })

  return (
    <section className={classes} style={styles} ref={listRef}>
      <ul className="side bg">
        {
          list.map((v, i) => (
            <li
              className={index === i ? 'active' : ''}
              key={i}
              onClick={() => changeIndex(i)}>
              { v.categoryName }
            </li>
          ))
        }
        <div className="blank"/>
      </ul>
      <ul className="content">
        { props.children ? (<li>{ props.children  }</li>) : null }
        {
          list.map((v, i) => v.list.length > 0 ? (
            <li key={i} data-index={i}>
              <h5 className="mt15">{v.categoryName}</h5>
              {
                v.list.map((item, j) => (
                  <ListItem key={j} onClick={() => setDetailVisible(true)}/>
                ))
              }
            </li>
          ) : null)
        }
      </ul>
      <DetailPopup visible={detailVisible} onClose={() => setDetailVisible(false)}/>
    </section>
  )
}
