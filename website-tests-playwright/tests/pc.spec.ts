/**
 * Created by Xing Zhong.
 * https://github.com/capricorncd
 * https://github.com/xing1984
 * Date: 2022/11/20 21:16:09 (GMT+0900)
 */
import { test, expect } from '../src'
import { getTextItems } from '../src/helpers'
import { items } from './github.items'

test.beforeEach(async ({ page }) => {
  await page.goto('/');
})

test.describe('homepage', () => {
  test('homepage has title @title', async ({ page }) => {
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle('Capricorncd - A developer who likes to write code');
  });

  test('header has title and github link @header', async ({ page, utils }) => {
    // Nav text
    await expect(page.locator('.page-title-wrapper')).toHaveText('Capricorncd')

    // get github icon locator
    const githubIcon = page.locator('.github')
    await expect(githubIcon).toHaveAttribute('href', 'https://github.com/capricorncd')

    // Click the get started link.
    await githubIcon.click();

    // Expects the URL to contain intro.
    // await expect(page).toHaveURL(/github\.com\/capricorncd/);

    // snapshot
    await utils.toMatchSnapshot('nav', 'header')
  })

  test('demos @demos', async ({ page }) => {
    const container = page.locator('.parallax-scrolling-wrap')

    // title and links
    const titleLocators = container.locator('.title')
    const titleCount = await titleLocators.count()
    for (let i = 0; i < titleCount; i++) {
      await expect(titleLocators.nth(i)).toHaveText(items[i].title)
      await expect(titleLocators.nth(i).locator('a')).toHaveAttribute('href', items[i].url)
    }
    // text
    const textLocators = container.locator('.text')
    const textCount = await textLocators.count()
    for (let i = 0; i < textCount; i++) {
      const { desc, tags, links } = await getTextItems(textLocators.nth(i))
      const item = items[i]
      await expect(desc).toBe(item.desc)
      await expect(tags).toBe(item.tags)
      for (let j = 0; j < links.length; j++) {
        await expect(links[j].url).toBe(item.links[links[j].text])
      }
    }
  })

  test('footer @footer', async ({ page, utils }) => {
    // more button snapshot
    await utils.toMatchSnapshot('more-button', '.more-wrapper a')
    await expect(page.locator('.more-wrapper a')).toHaveAttribute('href', 'https://github.com/capricorncd')
    await expect(page.locator('.more-wrapper a')).toHaveText('More Repositories')

    // footer
    await expect(page.locator('.banner-wrapper h1')).toHaveText('Thanks for your browsing!')
    await expect(page.locator('footer')).toHaveText(`© 2016-${new Date().getFullYear()} Capricorncd. kaneoki1984@gmail.com / capricorncd@qq.com`)
  })
})
