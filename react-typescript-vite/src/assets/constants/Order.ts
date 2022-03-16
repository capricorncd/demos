/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-07-04 21:13 (GMT+0900)
 */
export const OrderStatus = {
  placed: 1, // 已下单
  making: 2, // 制作中
  completed: 3, // 已完成
  cancelled: 4, // 已取消
} as const

export const OrderStatusTexts = {
  placed: '已下单',
  making: '制作中',
  completed: '已完成',
  cancelled: '已取消',
} as const
