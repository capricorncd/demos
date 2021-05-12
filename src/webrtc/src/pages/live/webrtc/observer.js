/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-07-30 23:10
 */
function Observer() {
  this. _eventList = {}
}

Observer.prototype = {
  constructor: Observer,
  /**
   * on event
   * @param eventType
   * @param fn
   */
  on: function(eventType, fn) {
    if (typeof fn !== 'function') {
      throw new Error(`${eventType}'s handler is not a function "${fn}"`)
    }
    if (!this._eventList[eventType]) {
      this._eventList[eventType] = []
    }
    this._eventList[eventType].push(fn)
  },
  once(eventType, fn) {
    let wrapFn = (...args) => {
      fn.apply(void 0, args)
      this.off(eventType, wrapFn)
    }
    this.on(eventType, wrapFn)
    return this
  },

  /**
   * emit params
   * @param eventType
   */
  emit(...args) {
    if (this._eventList[args[0]]) {
      let params = args.slice(1)
      this._eventList[eventType].forEach(fn => {
        fn(...params)
      })
    }
  },

  /**
   * off event
   * @param eventType
   * @param fn
   */
  off(eventType, fn) {
    let events = this._eventList[eventType]
    if (!events) return
    if (typeof fn === 'function') {
      let index = events.findIndex(item => item === fn)
      events.splice(index, 1)
    } else {
      events.length = 0
    }
  }
}

export default Observer
