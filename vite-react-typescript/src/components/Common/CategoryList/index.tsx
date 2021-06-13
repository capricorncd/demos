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

const BOTTOM_OFFSET = 70

interface CategoryListProps extends DefaultProps {

}

const list = Array.from({length: 30}).map((v, i) => {
  return {
    categoryId: i + 1,
    categoryName: i + '分类名称分类名称分类名称'.slice(0, Math.round(Math.random() * 10)),
    index: i,
    list: Array.from({length: Math.round(Math.random() * 10) || 1})
  }
})

export default function CategoryList(props: CategoryListProps) {
  const classes = getClasses('category-list', props.className)
  const [winHeight, setWinHeight] = useState(window.innerHeight - BOTTOM_OFFSET)
  const [index, setIndex] = useState(0)
  const [detailVisible, setDetailVisible] = useState(false)

  const listRef = useRef(null)

  useEffect(() => {
    // @ts-ignore
    const listEl: HTMLElement = listRef.current

    // window.addEventListener('scroll', (e: Event) => {
    //   console.log(document.documentElement.scrollTop);
    //   console.log(listEl.getBoundingClientRect());
    // })

    const sideEl = $('.side', listEl)[0]
    const sideElOffsetTop = sideEl.offsetTop
    const sideLisInfo = $('li', sideEl).map((el, i) => {
      return {
        el,
        index: i,
        top: el.offsetTop - sideElOffsetTop
      }
    })
    const contentEl = $('.content', listEl)[0]
    const contentElOffsetTop = contentEl.offsetTop

    // sideEl.addEventListener('scroll', () => {
    //   console.log('sideEl scroll', sideEl.scrollHeight, sideEl.scrollTop);
    // })

    let lis: HTMLElement[]
    contentEl.addEventListener('scroll', () => {
      lis = $('li', contentEl)
      for (let i = 0; i < lis.length; i++) {
        if (lis[i].offsetTop - contentElOffsetTop > contentEl.scrollTop + 50) {
          setIndex(Math.max(i - 1, 0))
          sideEl.scrollTop = sideLisInfo[Math.max(i - 1, 0)].top
          break
        }
      }
    })

    // resize
    window.addEventListener('resize', () => {
      setWinHeight(window.innerHeight - BOTTOM_OFFSET)
    })
  }, [])

  const styles: AnyObject = {
    height: winHeight + 'px',
  }

  function changeIndex(i: number): void {
    setIndex(i)
    // @ts-ignore
    positionHandler($('.content', listRef.current)[0], i)
  }

  return (
    <section className={classes} style={styles} ref={listRef}>
      <ul className="side">
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
      </ul>
      <ul className="content">
        {
          list.map((v, i) => (
            <li key={i} data-index={i}>
              <h5 className="mt15">{v.categoryName}</h5>
              {
                v.list.map((item, j) => (
                  <ListItem key={j} onClick={() => setDetailVisible(true)}/>
                ))
              }
            </li>
          ))
        }
      </ul>
      <DetailPopup visible={detailVisible} onClose={() => setDetailVisible(false)}/>
    </section>
  )
}
