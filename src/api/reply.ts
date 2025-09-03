import request from "../utils/request.ts";
import {PageParams} from "../utils/BasePageParams.ts";

export interface replyRequest {
    blogId:number | undefined,
    content:string | undefined,
    replyId:number |undefined,
    reviewType:number | undefined
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
    children:replyRecord[]
    replyStatus:boolean,
    userAvatar:string
}
export interface queryParam extends PageParams{
    blogId:number;
}

export interface mainPageReply{
    id:number;
    content:string;
    nickname:string;
    createTime:string
}

export function getReplyByBlogId(params : queryParam){
    return request.get('/review',{
        params
    })
}

export function reply(params : replyRequest){
    if (params.reviewType == undefined){
        params.reviewType = 0
    }
    return request.post('/review/reply',params)
}

export function getMainPageReply(){
    return request.get('/review/nearly')
}
