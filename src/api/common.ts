import request from "../utils/request.ts";
import {generateSign} from "../utils/sign.ts";


const BASE_URL = '/common'



export async  function getImgName() {
    console.log("进行加密咯")
    const path = ""
    const timestamp = Math.floor(Date.now() / 1000);
    const secret = import.meta.env.VITE_WEB_SECRET
    const sign = await generateSign(path, timestamp, secret);
    console.log("加密结果")
    return request.get(`${BASE_URL}/random?path=${path}&t=${timestamp}&sign=${sign}`)
}
