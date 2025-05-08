import request from "../utils/request.ts";

export interface replyRequest {
    blogId:string,
    content:string,
    replyId:string
}

//通过博客id获取评论列表
export interface replyRecord {
    id: number;               // 对应 Long id，使用 number
    content: string;          // String -> string
    createTime: string;       // LocalDateTime 一般转成 ISO 字符串
    likes: number;
    replyId: number;
    userId: number;
    nickname:string;
    avatar:string;
    reviewType: number;
    childList:replyRecord[]
    replyStatus:boolean
}
export interface queryParam{
    id:string;
    current: number;
    pageSize: number;
}

export interface mainPageReply{
    id:number;
    content:string;
    nickname:string;
    createTime:string
}

export function getReplyByBlogId(params : queryParam){
    return request.get('/review/page',{
        params
    })
}

export function reply(params : replyRequest){
    return request.post('/review/reply',params)
}

export function getMainPageReply(){
    return request.get('/review/mainPage')
}
