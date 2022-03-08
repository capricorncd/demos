/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/03/07 18:25:19 (GMT+0900)
 */
import styles from '../../styles/Header.module.scss'
import NavLinks from './NavLinks'

const Header = () => {
  return (
    <header className={styles.wrapper}>
      <div className="wp">
        <div className={styles.logo}/>
        <NavLinks/>
      </div>
    </header>
  )
}

export default Header