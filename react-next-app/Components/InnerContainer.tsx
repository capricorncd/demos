/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/03/08 22:15:09 (GMT+0900)
 */
import {ReactChild} from 'react'
import styles from '../styles/InnerContainer.module.scss'

interface InnerContainerProps {
  children: ReactChild
}

const InnerContainer = (props: InnerContainerProps) => {
  return (
    <div className={styles.container}>
      <i/><i/><i/><i/>
      <div className={styles.inner}>
        <div>
          {props.children}
        </div>
      </div>
    </div>
  )
}

export default InnerContainer