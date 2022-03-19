/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-05-25 19:45
 */
let currentEffect;

class Dependence {
  constructor(value) {
    this.effects = new Set()
    this._value = value
  }

  get value() {
    this.depend()
    return this._value
  }

  set value(value) {
    this._value = value
    this.notice()
  }

  // 1.收集依赖
  depend() {
    if (currentEffect) {
      this.effects.add(currentEffect)
    }
  }

  // 2.触发依赖
  notice() {
    this.effects.forEach(effect => {
      effect()
    })
  }
}

// const dep = new Dependence(10)

export function effectWatch(effect) {
  // 收集依赖
  currentEffect = effect
  effect()
  // dep.depend()
  currentEffect = null
}

// let b
//
// effectWatch(() => {
//   b = dep.value + 10
//   console.log('hello world', b)
// })
//
// // 修改值
// dep.value = 100
// // dep.notice()

const targetMap = new Map()

function getDependence(target, key) {
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }

  let dep = depsMap.get(key)
  if (!dep) {
    dep = new Dependence()
    depsMap.set(key, dep)
  }
  return dep
}

export function reactive(raw) {
  return new Proxy(raw, {
    get(target, key) {
      console.log(key, target[key])

      const dep = getDependence(target, key)
      // 依赖收集
      dep.depend()

      // return target[key]
      return Reflect.get(target, key)
    },
    set(target, key, value) {
      const dep = getDependence(target, key)
      // target[key] = value
      const result = Reflect.set(target, key, value)
      // 触发依赖
      dep.notice()
      return result
    }
  })
}


// const student = reactive({
//   gender: 1,
//   age: 18,
// })
//
// effectWatch(() => {
//   // student.age = 23
//   console.log(student.age)
// })
//
// student.age = 100
