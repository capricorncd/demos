/**
 * Created by Capricorncd.
 * User: https://github.com/capricorncd
 * Date: 2019/05/23 22:10
 */
// 2-1：多态
// 同一操作作用于不同的对象上面，可以产生不同的解释和不同的执行结果。

/**
 * 制造叫声
 * @param animal
 */
function makeSound (animal) {
  if (animal instanceof Duck) {
    console.log('Duck: ga ga ga!')
  } else if (animal instanceof Chicken) {
    console.log('Chicken: ge ge ge!')
  }
}

function Duck () {

}

function Chicken () {

}

makeSound(new Duck())
makeSound(new Chicken())

/**
 * 以上程序虽然体现了"多态性"，但存在缺点：
 * 比如狗，wang wang wang！此时必须改动makeSound函数，才能让狗发出叫声。
 */

// 多态背后的思想是将"做什么"和"谁去做以及怎么去做"分离开来，
// 即将"不变的事物"与"可能改变的事物"分离开来。

// 2-2：对象的多态性

// A：不变的部分分离
function makeSound2 (animal) {
  animal.sound()
}

// B：可变部分各自封装
Duck.prototype.sound = function () {
  console.log('Duck sound: ga ga ga!')
}

Chicken.prototype.sound = function () {
  console.log('Chicken sound: ge ge ge!')
}

makeSound2(new Duck())
makeSound2(new Chicken())

// 增加一只狗
function Dog () {

}

Dog.prototype.sound = function () {
  console.log('Dog sound: wang wang!')
}

makeSound2(new Dog())
