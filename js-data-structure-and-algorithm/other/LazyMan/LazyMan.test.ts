/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/03/18 11:53:10 (GMT+0900)
 */
import {LazyManClass} from './LazyMan'

test('base', done => {
  function callback(res: string[]): void {
    try {
      expect(res).toEqual([`Hi, I'm Audrey.`])
      done()
    } catch (err) {
      done(err)
    }
  }
  new LazyManClass('Audrey')
    .finally(callback)
})

test('sleep', done => {
  const result = [
    `Hi, I'm Audrey.`,
    `wait 2 seconds.`,
    `I just fell asleep for 2 seconds.`,
    `eat lunch.`
  ]
  function callback(res: string[]): void {
    try {
      expect(res).toEqual(result)
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
  const result = [
    `Hi, I'm Audrey.`,
    `eat lunch.`,
    `eat supper.`
  ]
  function callback(res: string[]): void {
    try {
      expect(res).toEqual(result)
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
  const result = [
    `wait 0.5 seconds.`,
    `I just fell asleep for 0.5 seconds.`,
    `wait 1 seconds.`,
    `I just fell asleep for 1 seconds.`,
    `Hi, I'm Audrey.`,
    `eat lunch.`
  ]
  function callback(res: string[]): void {
    try {
      expect(res).toEqual(result)
      done()
    } catch (err) {
      done(err)
    }
  }
  new LazyManClass('Audrey')
    .eat('lunch')
    .sleepFirst(0.5)
    .sleepFirst(1)
    .finally(callback)
})
