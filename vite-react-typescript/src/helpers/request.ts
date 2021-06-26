/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-26 21:32 (GMT+0900)
 */
import {AnyObject} from '@/types';

export async function request<T>(api: string, params: AnyObject = {}, type = 'GET'): Promise<T> {
  return new Promise((resolve, reject) => {
    fetch('https://api.github.com/users/Capricorncd')
      .then((response: Response) => {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        } else {
          throw new Error(response.statusText);
        }
      })
      .then(json => {
        resolve(json)
      })
      .catch(err => {
        console.log('Request Failed', err)
        reject(err)
      })
  })
}
