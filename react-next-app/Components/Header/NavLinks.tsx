/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/03/08 20:35:26 (GMT+0900)
 */
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../../styles/Header.module.scss'

const NavLinks = () => {
  const router = useRouter()
  const current =router.pathname.substring(1) || 'index'

  return (
    <div className={styles.nav}>
      <Link
        href="/">
        <a className={current === 'index' ? styles.current : ''}>HOME</a>
      </Link>
      <Link
        href="/contact">
        <a className={current === 'contact' ? styles.current : ''}>CONTACT US</a>
      </Link>
      <Link
        href="/404">
        <a className={current === '404' ? styles.current : ''}>404 Page</a>
      </Link>
      <a
        className={current === 'source' ? styles.current : ''}
        href="https://github.com/capricorncd/demos/tree/main/react-next-app"
        target="_blank"
        rel="noreferrer">Source</a>
      <a
        className={current === 'github' ? styles.current : ''}
        href="https://github.com/capricorncd"
        target="_blank"
        rel="noreferrer">Github</a>
    </div>
  )
}

export default NavLinks