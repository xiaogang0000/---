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
