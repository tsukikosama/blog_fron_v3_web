import request from "../utils/request.ts";
import qs from "query-string";

export interface BlogDetail {
    id: number;
    title: string;
    picture: string;
    content: string;
    createDate: string; // 通常 LocalDateTime 转成 ISO 字符串
    tagId: string;
    visit: number;
    userId: number;
    nickname: string;
    avatar: string;
    likes:number;
    isLike:number;
}
export interface blogParams {
    current: number;
    pageSize: number;
    tagId?:string;
    key?:string;
}

export interface recentBlog{
    id: string;
    nickname: string;
    avatar: string;
    createTime: string; // 格式为 "yyyy-MM-dd HH:mm:ss"，使用字符串表示
    title: string;
}

export function queryBlog(params : blogParams) {
    return request.get('/blog/page',{
        params,

    })
}

export function getBlogDetailById(id : number){
    return request.get('/blog/detail/'+id)
}

export function getRecentBlog(){
    return request.get('/blog/recentBlog')
}

// export function getBlogByTagId(tagIds : number[]){
//     return request.get('/blog/page', {
//         params: {
//             tagIds: tagIds.join(',')
//         }
//     })
// }
