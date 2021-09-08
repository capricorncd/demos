/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-26 21:32 (GMT+0900)
 */
import { AnyObject, RequestOptions } from '@/types'
import { isUrlLike } from '@/helpers/check'
import mockData from '~/data.json'

const DEF_HEADERS = {
  'Content-type': 'application/json; charset=UTF-8',
}

function createQueries(data: AnyObject): string {
  const arr = Object.entries(data).map((item) => item.join('='))
  return arr.length ? `?${arr.join('&')}` : ''
}

// function createSearchParams(data: AnyObject): URLSearchParams {
//   const urlSearchParams = new URLSearchParams()
//   Object.entries(data).forEach(([key, value]) => {
//     handleParams(value, key, urlSearchParams)
//   })
//   return urlSearchParams
// }

// function handleParams(params: any, key: string, data: URLSearchParams): void {
//   if (Array.isArray(params)) {
//     for (const value of params) {
//       handleParams(value, `${key}[]`, data)
//     }
//   } else if (isObject(params)) {
//     Object.entries(params).forEach(([_key, _value]) => {
//       handleParams(_value, `${key}[${_key}]`, data)
//     })
//   } else {
//     data.append(key, params)
//   }
// }

export function request<T>(_options: RequestOptions): Promise<T> {
  const { url, method = 'get', data = {}, headers = {} } = _options
  return new Promise((resolve, reject) => {
    // handle url
    let apiUrl = isUrlLike(url) ? url : `/api/${url}`
    // handle options
    const options: AnyObject = { method, headers: { ...DEF_HEADERS, ...headers } }
    // handle data
    if (Object.keys(data).length) {
      switch (method.toLowerCase()) {
        case 'get':
          apiUrl += createQueries(data)
          break
        case 'post':
          options.body = JSON.stringify(data)
          break
      }
    }

    fetch(apiUrl, options)
      .then((response: Response) => {
        if (response.status >= 200 && response.status < 300) {
          if (apiUrl.includes('/api/home')) {
            return mockData
          }
          return response.json()
        } else {
          throw new Error(response.statusText)
        }
      })
      .then((json) => {
        resolve(json)
      })
      .catch((err) => {
        // console.error('Request Failed', err)
        reject(err)
      })
  })
}

request.get = function requestGet<T>(api: string, params: AnyObject = {}, headers: AnyObject = {}): Promise<T> {
  return request({
    url: api,
    method: 'get',
    data: params,
    headers,
  })
}
request.post = function requestPost<T>(api: string, params: AnyObject = {}, headers: AnyObject = {}): Promise<T> {
  return request({
    url: api,
    method: 'post',
    data: params,
    headers,
  })
}
