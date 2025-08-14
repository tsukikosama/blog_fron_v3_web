import request from "../utils/request.ts";

const BASE_URL = "/tag"

export interface tag {
    id: number;
    name: string;

}

export function queryTags() {
    return request.get<tag[]>(`${BASE_URL}/list`)
}

