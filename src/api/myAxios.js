//该文件是对axios进行二次封装，封装目标；
import axios from "axios"
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import {getUserTempId,readToken} from '@/utils/auth'
import store from '@/store'

 /*  
     配置ajax请求：基本路径、超时时间。
     给ajax请求添加进度条效果。
     返回服务器响应真正的数据。
     统一处理ajax请求错误。
*/


//创建一个axios的实力，专门用于联系尚品汇的服务器
const myAxios = axios.create({
    baseURL:'/sph',  //请求基本路径
    timeout:5000,   //超时时间
})

//请求拦截器
myAxios.interceptors.request.use((config)=>{
    //进度条开始
    nprogress.start()
    //响应头中添加token
    const token  = readToken()
    if(token){
        config.headers.token =  readToken()
    }
    //向请求投中发送uuid
    config.headers.UserTempId= getUserTempId()
    return config
})
export default myAxios

//响应拦截器
myAxios.interceptors.response.use(
    //响应成功的回调
    response=>{ 
        //进度条停止
        nprogress.done()
        //判断code是否为208,208意味着：token过期了
        if(response.data.code === 208){
            //token 已失效，强制退出登录
store.dispatch('logout','身份已过期，请您重新登录')
return new Promise(()=>{})
        }
        //返回数据结果
       return response.data
    },
    error=>{
        //第一种做法：让错误继续下去，从而触发程序员发送请求时失败的回调
    // throw error.message

    //第二种做法：返回一个pending状态的Promise实例，中断Promise链，不走程序员请求的回调
        nprogress.done()
        //统一提示错误
        alert(error.message)
        return new Promise(()=>{})
     }
    )