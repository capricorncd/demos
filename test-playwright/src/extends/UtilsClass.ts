/**
 * Created by Xing Zhong.
 * https://github.com/capricorncd
 * Date: 2022/09/30 19:49:51 (GMT+0900)
 *
 * @document utils
 *
 * ```ts
 * import { test } from './extends'
 *
 * test('description', async ({ utils }) => {
 *   const res = await utils.get('api/useInfo')
 *   console.log(res)
 * })
 * ```
 */
import {Page, APIRequestContext, Locator} from '@playwright/test'
import {log, warn} from 'zx-sml/nodejs'
import {joinUrl} from 'zx-sml'

// export type UtilsClassOptions = PlaywrightTestArgs &
//   PlaywrightTestOptions &
//   PlaywrightWorkerArgs &
//   PlaywrightWorkerOptions;
export type UtilsClassOptions = {
  page: Page;
  locale: string;
  request: APIRequestContext;
};

const env = {
  API_BASE_URL: 'http://localhost:9527',
}

export class UtilsClass {
  private readonly options: UtilsClassOptions;
  private readonly page: Page;
  private readonly request: APIRequestContext;
  public apiBaseUrl: string = env.API_BASE_URL;
  public locale: string;

  constructor(options: UtilsClassOptions) {
    const {page, request, locale = ''} = options;
    this.options = options;
    this.page = page;
    this.request = request;
    this.locale = locale.split('-')[0];
  }

  /**
   * @method toLocator(selector)
   *
   * @param selector `string | Locator`
   * @returns `Locator`
   */
  toLocator(selector: string | Locator): Locator {
    return typeof selector === 'string'
      ? this.page.locator(selector)
      : selector;
  }

  /**
   * @method get<T>(api, options)
   *
   * @param api `string` apiのurl
   * @param options? `object` [apiRequestContext.get(url, options)](https://playwright.dev/docs/api/class-apirequestcontext#api-request-context-get)
   * @returns `T`
   */
  async get<T>(api: string, options?: Record<string, unknown>): Promise<T> {
    try {
      const url = /^(https?:)?\/\/.+/.test(api)
        ? api
        : joinUrl(this.apiBaseUrl, api);
      const res = await this.request.get(url, options);
      log('utils.get:', res.url());
      if (res.ok()) {
        return res.json();
      } else {
        throw new Error(`${res.status()} ${res.statusText()} [${res.url()}]`);
      }
    } catch (err) {
      warn(err.message);
      throw err;
    }
  }

  /**
   * @method getResponseOfUrl(api)
   * https://playwright.dev/docs/api/class-page#page-wait-for-response
   * @param api `string` API
   * @returns `Promise<T>`
   */
  async getResponseForUrl<T>(api: string): Promise<T> {
    const response = await this.page.waitForResponse(
      (response) => response.url().includes(api) && response.status() === 200
    );
    const body = await response.body();
    return JSON.parse(body.toString());
  }
}
