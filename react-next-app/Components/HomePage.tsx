/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/03/07 20:25:22 (GMT+0900)
 */
import {useState, useEffect} from 'react'
import {loadImgSource} from '../helpers'
// import '../styles/HomePage.scss'

const SOURCE_PREFIX = './home-anime/'
const sources: Record<string, string> = {
  verticalLine: SOURCE_PREFIX + 'vertical-line.png',
  jukeboxStart: SOURCE_PREFIX + 'jukebox-start.png',
  jukeboxEnd: SOURCE_PREFIX + 'jukebox-end.png',
  btnLeft: SOURCE_PREFIX + 'btn-left.png',
  btnRight: SOURCE_PREFIX + 'btn-right.png',
  enDecorate: SOURCE_PREFIX + 'en-decorate.png',
  listen: SOURCE_PREFIX + 'listen.png',
  people: SOURCE_PREFIX + 'people.png',
  pictureFrame: SOURCE_PREFIX + 'picture-frame.png',
  pictureFrameMiddle: SOURCE_PREFIX + 'picture-frame-middle.png',
  pictureFrameTop: SOURCE_PREFIX + 'picture-frame-top.png',
  btnIos: SOURCE_PREFIX + 'btn-ios.png',
  btnAndroid: SOURCE_PREFIX + 'btn-android.png',
  qr: SOURCE_PREFIX + 'qr.png',
}

interface HomeProps {
  onLoaded: () => void
}

const HomePage = (props: HomeProps) => {
  const [isMouseEnter, setIsMouseEnter] = useState(false)
  const [isMouseLeave, setIsMouseLeave] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      loadImgSource(sources).then(_ => {
        props.onLoaded()
      })
    }
  }, [])

  const btnClick = (type: string) => {
    alert(`${type} Download.`)
  }

  const qrMouseEnter = () => {
    setIsMouseEnter(true)
    setIsMouseLeave(false)
  }
  const qrMouseLeave = () => {
    setIsMouseEnter(false)
    setIsMouseLeave(true)
  }

  return (
    <div className="home-animation-wrapper">
      <div className="bg"/>
      <img
        src={sources.verticalLine}
        className='vertical-line'/>
      <img
        src={sources.jukeboxEnd}
        className='jukebox-end'/>
      <img
        src={sources.jukeboxStart}
        className='jukebox-start'/>
      <img
        src={sources.people}
        className='people'/>
      <img
        src={sources.btnLeft}
        className='btn-left'/>
      <img
        src={sources.btnRight}
        className='btn-right'/>
      <img
        src={sources.listen}
        className='listen'/>
      <img
        src={sources.enDecorate}
        className='en-decorate'/>
      <img
        src={sources.pictureFrame}
        className="picture-frame __bottom"/>
      <img
        src={sources.pictureFrameMiddle}
        className="picture-frame __middle"/>
      <img
        src={sources.pictureFrameTop}
        className="picture-frame __top"/>
      <div className="slogan">
        <h1><span>Listen, </span>it's like falling in love</h1>
        <p>Start the journey of love on campus with sound as a starting point.</p>
        <p>Love on campus is the best thing in life, so we made this product.</p>
        <p>I hope that everyone I meet has a beautiful love, </p>
        <p>dedicated to the same beautiful you.</p>
      </div>
      <img
        src={sources.btnIos}
        className={['btn-ios', isMouseEnter ? 'is-mouse-enter' : '', isMouseLeave ? 'is-mouse-leave' : ''].join(' ')}
        onClick={() => btnClick('ios')}/>
      <img
        src={sources.btnAndroid}
        className={['btn-android', isMouseEnter ? 'is-mouse-enter' : '', isMouseLeave ? 'is-mouse-leave' : ''].join(' ')}
        onClick={() => btnClick('android')}/>
      <img
        src={sources.qr}
        className={['qr-pic', isMouseEnter ? 'is-mouse-enter' : '', isMouseLeave ? 'is-mouse-leave' : ''].join(' ')}
        onMouseEnter={qrMouseEnter}
        onMouseLeave={qrMouseLeave}/>
    </div>
  )
}

export default HomePage