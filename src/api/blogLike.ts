import request from "../utils/request.ts";

export function like(id:number){
    return request.post('/blogLike/like/'+id)
}
