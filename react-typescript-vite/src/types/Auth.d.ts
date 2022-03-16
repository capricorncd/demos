/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-27 11:25 (GMT+0900)
 *
 * #授权登录API
 * 用户通过微信/LINE/PayPay扫码授权登录API
 * 扫码->URL(https://onescan.co.jp/client/entry?qrId=XXX100000002)->加载页面->验证token
 * @apiUrl api/auth
 * @method post
 * @param platform sting/null 入口平台，微信`weixin`/LINE`line`/PayPay`paypay`/其他浏览器`null`
 * @param qrCodeId string 二维码Id。生成二维码时，为每个二维码生成的不重复编号，后台手动将该ID与店铺餐桌信息（如商家及餐桌Id）绑定。
 * @param token string/null Token，验证用户是否已登录。为空或验证未登录则重新授权生成新的Token。
 */
import {LanguageTypes} from "@/types/Common";

export interface AuthResponse extends AuthSuccessResponse {
  status: number; // 1已授权成功 2未授权，且非微信等平台，无法重定向至授权页面时则需跳转至登录页面
}

export interface AuthSuccessResponse {
  user_info: UserInfo;// 用户信息
  entry_cover?: string;// 欢迎页封面图。为空则不显示欢迎页面，直接进入菜品主页
  merchant_info: MerchantInfo; // 店铺信息
  primary_color: string; // 主题色
  token: string; // 用户授权凭证
  redirect_url: string; // 授权成功后的跳转地址。https://[merchant_id].onescan.co.jp
  platform_info: PlatformInfo; // 平台相关信息。后期调用平台（微信等）相关接口时使用的相关数据
}

// 用户信息
export interface UserInfo {
  user_id: number;// 用户ID
  user_name: string;// 用户昵称
  avatar: string;// 用户头像
  language: LanguageTypes; // 设定语言，未设置时为空
}

// 系统/店铺基础数据
export interface MerchantInfo {
  merchant_id: number; // 店铺Id
  merchant_name: string; // 店铺名称
  merchant_sub_name: string; // 店铺别名或其他语言名称
  qr_cord_id?: number; // 扫码对应的二维码（餐桌）id
  table_name: string; //餐桌名称或编号，如8号（桌），xx包间等
  price_symbol: string; //价格符号，如$/¥
  is_tax_included: boolean; // 是否为含税价格
  address: string; // 店铺地址
  business_open_time: string; // 营业开始时间（时间统一用时间戳，还是yyyy-MM-dd hh:mm:ss形式待定）
  business_close_time: string; // 营业结束时间
  system_time: string; // 服务器系统时间，用于本地时间校对
  latitude?: string; // 商家店铺所在纬度，用于地图显示
  longitude?: string; // 商家店铺所在经度
}

export interface PlatformInfo {
  token?: string; // 待定
}
