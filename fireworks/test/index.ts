/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-05-16 10:58
 */
import { Fireworks } from '../src'
import './style.scss'

// @ts-ignore
const canvas = new Fireworks(window)
document.querySelector('#app')?.append(canvas)
