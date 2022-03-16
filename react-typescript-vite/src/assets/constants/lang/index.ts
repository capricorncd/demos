/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-08-01 17:55 (GMT+0900)
 */
import en from './en'
import ja from './ja'
import ko from './ko'
import zh from './zh'
import columns from './columns'
import { LanguageTypes, LanguageData } from '@/types'
import { AppConstants } from '@/assets/constants'

/**
 * 获取语言数据
 * @param type
 */
export function getLanguages(type: LanguageTypes = AppConstants.languageTypeJA): LanguageData {
  const languages = { en, ja, zh, ko }
  const lang = languages[type]
  const data: LanguageData = {}
  Object.keys(columns).forEach((index) => {
    // @ts-ignore
    data[columns[index]] = lang[index]
  })
  return data
}

export function getLanguageList(): { label: string; value: string }[] {
  return [
    {
      label: 'English',
      value: 'en',
    },
    {
      label: '日本語',
      value: 'ja',
    },
    {
      label: '한국어',
      value: 'ko',
    },
    {
      label: '简体中文',
      value: 'zh',
    },
  ]
}
