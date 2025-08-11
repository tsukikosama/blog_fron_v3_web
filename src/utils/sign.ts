// utils/sign.ts
export async function generateSign(path: string, timestamp: number, secret: string) {
    // 1. 拼接字符串
    const rawStr = `${path}|${timestamp}|${secret}`;

    // 2. 简单混淆（把字符串反转）
    const reversedStr = rawStr.split('').reverse().join('');

    // 3. 转成 Uint8Array
    const data = new TextEncoder().encode(reversedStr);

    // 4. 计算 SHA-256
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);

    // 5. 转为 hex 字符串
    return Array.from(new Uint8Array(hashBuffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}
