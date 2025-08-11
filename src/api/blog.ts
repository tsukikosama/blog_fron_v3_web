import request from "../utils/request.ts";

const BASE_URL = '/blog'

export interface BlogDetail {
    id: number;
    title: string;
    picture: string;
    content: string;
    createTime: string; // 通常 LocalDateTime 转成 ISO 字符串
    tagId: string;
    visit
        : number;
    userId: number;
    username: string;
    avatar: string;
    likes:number;
    simpleTitle:string
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
    return request.get(`${BASE_URL}/page`,{
        params,

    })
}

export function getBlogDetailById(id : string){
    return request.get<BlogDetail>(`${BASE_URL}/`+id)
}

export function getRecentBlog(){
    return request.get(`${BASE_URL}/recent`)
}

// export function getBlogByTagId(tagIds : number[]){
//     return request.get('/blog/page', {
//         params: {
//             tagIds: tagIds.join(',')
//         }
//     })
// }
