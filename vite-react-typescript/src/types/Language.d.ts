/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-27 11:25 (GMT+0900)
 *
 * #用户语言设置API
 * 通过该接口设置系统显示语言
 * @apiUrl api/user/setLanguage
 * @method post
 * @param type sting 目前可选项`zh/jp/en`
 */
export interface LanguageSetResponse {
  status: number; // 1成功 2失败
  message?: string; // 提示消息
}
