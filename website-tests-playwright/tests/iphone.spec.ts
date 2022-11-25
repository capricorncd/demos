/**
 * Created by Xing Zhong.
 * https://github.com/capricorncd
 * https://github.com/xing1984
 * Date: 2022/11/20 21:16:09 (GMT+0900)
 */
import { test, devices } from '../src'

test.use({
  ...devices['iPhone 12']
})

test.beforeEach(async ({ page }) => {
  await page.goto('/');
})

test.describe('iPhone 12', () => {
  test('toMatchSnapshot @iphone', async ({ utils }) => {
    // snapshot
    await utils.toMatchSnapshot('nav', 'header')
    // more button snapshot
    await utils.toMatchSnapshot('more-button', '.more-wrapper a')
  })
})
