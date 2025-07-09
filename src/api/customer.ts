import request from "../utils/request.ts";


const BASE_URL = '/customer'
export interface userLoginRequest {
    username:string,
    password:string,
}
export interface Customer {
    id: number; // Long 类型对应 TS 的 number
    username: string;
    avatar?: string; // 可选字段
    password: string;
    createTime?: string; // LocalDateTime 类型通常表示为字符串（ISO 格式）
    userType?: number; // 可选字段
    isValid?: number; // 可选字段
    version?: number; // 可选字段
    email: string;
    about?: string; // 可选字段
    nickname?: string; // 可选字段
    ban?: string; // 可选字段
    updateTime?: string; // LocalDateTime 类型通常表示为字符串（ISO 格式）
}

export interface mainUserInfo{
    weekCount:number,
    blogCount:number,
    monthCount:number
}

/**
 * 注册请求
 */
export interface registerReq{
    username:string,
    password:string,
}

/**
 * 登录方法
 * @param param
 */
export function  login(param:any) {
    return  request.post(`${BASE_URL}/login`,param)
}

export function info(){
    return request.get(`${BASE_URL}/info`)
}

export function registerCustomer(req:registerReq){
    return request.post(`${BASE_URL}/register`,req)
}

export function mainPageInfo(){

    return request.get(`${BASE_URL}/mainInfo`)
}
