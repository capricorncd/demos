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
 * @param shopId string 商铺ID或唯一标识
 * @param tableId number 餐桌编号(下单时再提交？)
 * @param redirectUrl string 授权成功后的跳转地址
 */
export interface AuthResponse {
  user_info: UserInfo;// 用户信息
  entry_cover?: string;// 欢迎页封面图。为空则不显示欢迎页面，直接进入菜品主页
  basic_data: BasicData; // 基数数据
}

// 用户信息
export interface UserInfo {
  id: number;// 用户ID
  name: string;// 用户昵称
  avatar: string;// 用户头像
}

// 系统/店铺基础数据
export interface BasicData {
  price_symbol: string; //价格符号
  isTaxIncluded: boolean; // 是否为含税价格
}
