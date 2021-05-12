/**
 * Created by Capricorncd.
 * User: https://github.com/capricorncd
 * Date: 2019/05/23 21:57
 */
/**
 * 面向接口编程，而不是面向实现编程
 * @type {{singing(): void}}
 */
const duck = {
  singing () {
    console.log('ga ga ga!')
  }
}

const chicken = {
  singing () {
    console.log('ga ga ga!')
  }
}

const choir = []

function joinChoir (animal) {
  // Check whether animal have singing function?
  if (animal && typeof animal.singing === 'function') {
    choir.push(animal)
    console.log('Join success, choir length:', choir.length)
  }
}

joinChoir(duck)
joinChoir(chicken)
