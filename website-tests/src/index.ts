/**
 * Created by Xing Zhong.
 * https://github.com/capricorncd
 * https://github.com/xing1984
 * Date: 2022/11/20 20:32:24 (GMT+0900)
 */
import {
  test as base,
  expect,
  Page,
  Locator,
  devices,
} from '@playwright/test';
import { UtilsClass } from "./UtilsClass";

type ExtendTypes = {
  utils: UtilsClass;
};

const test = base.extend<ExtendTypes>({
  utils: async ({ page, request, locale }, use) => {
    await use(new UtilsClass({ page, request, locale: locale || '' }));
  },
});

export {
  test,
  expect,
  devices,
  Page,
  Locator,
  UtilsClass,
}
