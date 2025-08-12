// utils/sign.ts
import CryptoJS from "crypto-js";

export function generateSign(path: string, timestamp: number, secret: string) {
    const rawStr = `${path}|${timestamp}|${secret}`;
    const reversedStr = rawStr.split("").reverse().join("");
    return CryptoJS.SHA256(reversedStr).toString(CryptoJS.enc.Hex);
}
