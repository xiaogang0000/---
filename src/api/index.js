/*
1.该文件用于管理整个应用的请求
2.每一个接口都对应一个请求函数
*/
import myAxios from "./myAxios";
import mockAxios from './mockAxios'
/**
 * @author小刚
 * @params （参数）
 * @returns 
 */
//
export const reqCategoryList = () => myAxios.get('/api/product/getBaseCategoryList')
export const reqSlideList = () => mockAxios.get('/slide')
export const reqFloorList = () => mockAxios.get('/floor')

//获取搜索模块数据  地址：/api/list 请求方式：post  参数：需要带参数
/*
{
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
}
*/
//当前接口，给服务器传递一个默认参数，至少是一个空对象
export const reqSearchInfo = (params)=>myAxios.post('/api/list',params)
//请求商品详细信息
export const reqGoodsInfo = (id)=>myAxios.get('/api/item/'+id)
//请求添加商品详细信息
export const reqAddGoods2Cart = (id,num)=>myAxios.post(`/api/cart/addToCart/${id}/${num}`)
//请求购物车列表
export const reqCartList = ()=>myAxios.get('/api/cart/cartList')
//请求勾选购物车的某个商品
export const reqCheckOneCart = (id,isChecked)=>myAxios.get(`/api/cart/checkCart/${id}/${isChecked}`)
//请求批量勾选购物车列表
export const reqBatchCheckCart = (idList,isChecked)=>myAxios.post(`/api/cart/batchCheckCart/${isChecked}`,idList)
//请求删除购物车中的某个商品
export const reqDeleteOneCart = (id)=>myAxios.delete(`/api/cart/deleteCart/${id}`)
//请求批量某些删除物品
export const reqBatchDeleteCart = (idList)=>myAxios.post(`/api/cart/batchDeleteCart`,idList)
//请求获取验证码
export const reqGetCode = (phone)=>myAxios.get(`/api/user/passport/sendCode/${phone}`)
//请求注册
export const reqRegister = (params)=>myAxios.post('/api/user/passport/register',params)
//请求登录(手机号，密码))
export const reqLogin = (params)=>myAxios.post('/api/user/passport/login',params)
//请求用户信息，无需参数，但依赖请求的token
export const reqUserInfo = ()=>myAxios.get('/api/user/passport/auth/getUserInfo')
//请先退出登录
export const reqLogout = ()=>myAxios.get('/api/user/passport/logout')
//请求收货地址信息
export const reqAddressList = ()=>myAxios.get('/api/user/userAddress/auth/findUserAddressList')
//商品清单
export const reqTradeInfo = ()=>myAxios.get('/api/order/auth/trade')
//请求提交订单
export const reqSubmitOrder = (tradeNo,paramsObj)=>myAxios.post(`/api/order/auth/submitOrder?tradeNo=${tradeNo}`,paramsObj)
//请求支付信息
export const reqPayInfo = (orderId)=>myAxios.get(`/api/payment/weixin/createNative/${orderId}`)