import { v4 as uuidv4 } from "uuid";

//该函数专门用于给外部提供一个用户临时标识
export function getUserTempId() {
  const Usertempid = localStorage.getItem('Usertempid')
  if (Usertempid) {
    return Usertempid
  } else {
    let newUserTempId = uuidv4();
    //存local中一份
    localStorage.setItem('Usertempid', newUserTempId)
    //return 出去
  return newUserTempId
  }
}

//保存token
export function saveToken(token){
 localStorage.setItem('token',token)
}

//读取token
export function readToken(){
 return localStorage.getItem('token')
}
export function deleteToken(){
  return localStorage.removeItem('token')
 }
 
