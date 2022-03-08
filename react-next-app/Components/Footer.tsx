/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/03/08 20:59:19 (GMT+0900)
 */
import styles from '../styles/Footer.module.scss'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className="wp">
        <dl>
          <dd>
            <span className="key">CopyRight: </span><span className="value">© 2016-{year} Capricorncd.</span>
          </dd>
        </dl>
        <dl>
          <dd>
            <span className="key">Email: </span><span className="value">kaneoki1984@gmail.com</span>
          </dd>
        </dl>
      </div>
    </footer>
  )
}

export default Footer