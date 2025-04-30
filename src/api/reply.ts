import request from "../utils/request.ts";

export interface replyRequest {
    blogId:number,
    content:string,
    replyId?:number
}

//通过博客id获取评论列表
export interface Comment {
    id?: number;               // 对应 Long id，使用 number
    content?: string;          // String -> string
    createTime?: string;       // LocalDateTime 一般转成 ISO 字符串
    likes?: number;
    blogId?: number;
    replyId?: number;
    userId?: number;
    reviewType?: number;
}
export interface queryParam{
    blogId:number;
    current: number;
    pageSize: number;
}
export function reviewPage(param : queryParam) {
    return request.get('/review/page',param)
}
