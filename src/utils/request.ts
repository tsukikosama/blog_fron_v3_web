import axios from "axios";
import { Message } from '@arco-design/web-vue';

// 创建 Axios 实例
const request = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL, // 你的 API 基础地址
    timeout: 10000,
});


request.interceptors.request.use(
    (config) => {

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

request.interceptors.response.use(
    (response) => {

        const { data, config } = response;
        let res: Res = data;
        // 未登录
        if (res.code == 401) {
            const loginUrl =
                process.env.NODE_ENV === 'development'
                    ? 'http://localhost:5173/login'
                    : 'http://8.138.16.124:10001/login';
            location.href = loginUrl;
            throw new Error(res.msg || '未登录');
        }

        // 失败
        if (res.code != 0) {
            Message.error(res.msg || '请求失败');
            throw new Error(res.msg || '请求失败');
        }

        // 文件流
        if (config.responseType === 'blob') {
            return res;
        }

        // 字符串 JSON
        if (typeof res === 'string') {
            try {
                res = JSON.parse(res);
            } catch {
                Message.error('返回数据格式错误');
                throw new Error('返回数据格式错误');
            }
        }

        return res;
    },
    (error) => {
        console.error('接口错误：', error);
        Message.error(error.message || '网络错误');
        return Promise.reject(error);
    }
);

export default request;
