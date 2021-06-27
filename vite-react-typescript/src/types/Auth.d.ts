/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-27 11:25 (GMT+0900)
 *
 * #授权登录API
 * 用户通过微信/LINE/PayPay扫码授权登录API
 * @apiUrl api/auth
 * @method post
 * @param platform sting 入口平台，微信`weixin`/LINE`line`/PayPay`paypay`/普通浏览器`other`
 * @param shop_id string 商铺ID或唯一标识
 * @param table_id number 餐桌编号(下单时再提交？)
 * @param redirect_url string 授权成功后的跳转地址
 */
export interface AuthResponse {
  user: UserInfo;// 用户信息
  entry_cover?: string;// 欢迎页封面图。为空则不显示欢迎页面，直接进入菜品主页
}

// 用户信息
export interface UserInfo {
  id: number;// 用户ID
  name: string;// 用户昵称
  avatar: string;// 用户头像
}
