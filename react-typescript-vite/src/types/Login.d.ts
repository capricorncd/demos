/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-27 11:25 (GMT+0900)
 *
 * #用户语言设置API
 * 通过该接口设置系统显示语言
 * @apiUrl api/login
 * @method post
 * @param regionCode sting 区号
 * @param phone sting 手机号
 * @param code sting 验证码
 */
import {AuthSuccessResponse} from "@/types/Auth";

export interface LoginResponse extends AuthSuccessResponse {
  status: number; // 1成功 2失败
}
