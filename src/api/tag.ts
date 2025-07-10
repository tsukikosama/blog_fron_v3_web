import request from "../utils/request.ts";

const BASE_URL = "/tag"

export interface tag {
    id: number;
    tagName: string;

}

export function queryTags() {
    return request.get(`${BASE_URL}/list`)
}

