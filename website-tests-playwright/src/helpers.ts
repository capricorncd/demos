/**
 * Created by Xing Zhong.
 * https://github.com/capricorncd
 * https://github.com/xing1984
 * Date: 2022/11/20 21:16:09 (GMT+0900)
 */
import { Locator } from './index'

export interface LinkItem {
  text: string;
  url: string;
}

export async function getTextItems(parent: Locator): Promise<{
  desc: string | null;
  tags: string | null;
  links: LinkItem[]
}> {
  const pLocators = parent.locator('p')

  const desc = (await pLocators.nth(0).textContent()) ?? ''
  const tags = (await pLocators.nth(1).textContent()) ?? ''

  const links: LinkItem[] = []
  const anchors = pLocators.nth(2).locator('a')
  const anchorsCount = await anchors.count()
  for (let i = 0; i < anchorsCount; i++) {
    const text = (await anchors.nth(i).textContent()) ?? ''
    links.push({
      text: text.replace(/\[|\]/g, ''),
      url: (await anchors.nth(i).getAttribute('href')) ?? '',
    })
  }
  return {
    desc: desc.trim(),
    tags: tags.trim(),
    links,
  }
}