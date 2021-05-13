/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-04-20 20:39
 *
 * for break
 * 多重for循环的break使用
 *
 * 把学生按从上到下，每排增加一个座位，从左到右安排就坐（第一排只有一个座位，...第n排n个座位）
 * 然后从上到下、从右至左找出第一位成绩为XX分的同学及位置信息
 */
const students = [
  { name: 'Lilith', score: 99 },
  { name: 'Adrian', score: 67 },
  { name: 'Mary', score: 100 },
  { name: 'Jack', score: 96 },
  { name: 'Thomas', score: 85 },
  { name: 'Cary', score: 54 },
  { name: 'Phy', score: 91 },
  { name: 'Charles', score: 89 },
  { name: 'Mark', score: 88 },
  { name: 'Bill', score: 45 },
  { name: 'Vincent', score: 98 },
  { name: 'William', score: 98 },
  { name: 'Apollo', score: 60 },
  { name: 'James', score: 70 },
  { name: 'Henry', score: 98 },
  { name: 'Gary', score: 83 },
  { name: 'Martin', score: 98 },
  { name: 'Ulrica', score: 91 },
  { name: 'George', score: 83 },
  { name: 'Adela', score: 98 },
  { name: 'Sandra', score: 91 },
]

function setPosition(list) {
  const arr = []
  let index = 0
  list.forEach(item => {
    if (!arr[index]) arr[index] = []
    arr[index].push({
      ...item,
      row: index + 1,
      column: arr[index].length + 1,
    })
    if (arr[index].length > index) index++
  })
  return arr
}

function find(score, list) {
  let target = null
  const positions = setPosition(list)
  outLoop: for (let row of positions) {
    for (let i = row.length - 1; i >= 0; i--) {
      if (row[i].score === score) {
        target = row[i]
        break outLoop
      }
    }
  }
  return target
}

console.log(find(98, students))
