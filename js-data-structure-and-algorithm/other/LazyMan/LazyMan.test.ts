/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/03/18 11:53:10 (GMT+0900)
 */
import {LazyManClass} from './LazyMan'

test('base', done => {
  function callback(res: string[]): void {
    try {
      expect(res.join(' '))
        .toBe(`Hi, I'm Audrey.`)
      done()
    } catch (err) {
      done(err)
    }
  }
  new LazyManClass('Audrey')
    .finally(callback)
})

test('sleep', done => {
  function callback(res: string[]): void {
    try {
      expect(res.join(' '))
        .toBe(`Hi, I'm Audrey. wait 2 seconds. I just fell asleep for 2 seconds. eat lunch.`)
      done()
    } catch (err) {
      done(err)
    }
  }
  new LazyManClass('Audrey')
    .sleep(2)
    .eat('lunch')
    .finally(callback)
})


test('eat', done => {
  function callback(res: string[]): void {
    try {
      expect(res.join(' '))
        .toBe(`Hi, I'm Audrey. eat lunch. eat supper.`)
      done()
    } catch (err) {
      done(err)
    }
  }
  new LazyManClass('Audrey')
    .eat('lunch')
    .eat('supper')
    .finally(callback)
})


test('sleepFirst', done => {
  function callback(res: string[]): void {
    try {
      expect(res.join(' '))
        .toBe(`wait 2 seconds. I just fell asleep for 2 seconds. wait 1 seconds. I just fell asleep for 1 seconds. Hi, I'm Audrey. eat lunch.`)
      done()
    } catch (err) {
      done(err)
    }
  }
  new LazyManClass('Audrey')
    .eat('lunch')
    .sleepFirst(2)
    .sleepFirst(1)
    .finally(callback)
})
