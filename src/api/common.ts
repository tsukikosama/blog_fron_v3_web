import request from "../utils/request.ts";
import {generateSign} from "../utils/sign.ts";


const BASE_URL = '/common'



export async  function getImgName() {
    const path = ""
    const timestamp = Math.floor(Date.now() / 1000);
    const secret = import.meta.env.VITE_WEB_SECRET
    const sign = await generateSign(path, timestamp, secret);
    return request.get(`${BASE_URL}/random?path=${path}&t=${timestamp}&sign=${sign}`)
}
