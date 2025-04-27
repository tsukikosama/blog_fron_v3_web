import request from "../utils/request.ts";


export interface tag {
    id: number;
    tagName: string;

}

export function queryTags() {
    return request.get('/tag/list',{})
}
