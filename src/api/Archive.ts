import request from "../utils/request.ts";

const BASE_URL = '/archive'

export interface ArchiveItem {
    id : number;
    title : string;
    createTime : string;
}

export interface ArchiveResp {
    year : number;
    archiveList : ArchiveItem[];
}

export function getArchive(){
    return request.get<ArchiveResp[]>(`${BASE_URL}/list`)
}
