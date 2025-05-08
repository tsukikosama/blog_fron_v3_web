import { defineStore } from 'pinia'

interface UserInfo {
    token: string;
    username: string;
    roles: string[];
    nickname:string,
    avatar:string,
}

export const useUserStore = defineStore('user', {
    state: (): UserInfo => ({
        token: '',
        username: '',
        nickname:'',
        avatar:'',
        roles: [],
    }),
    actions: {
        // 保存用户信息
        setUserInfo(userInfo: UserInfo) {
            this.token = userInfo.token;
            this.username = userInfo.username;
            this.nickname = userInfo.nickname;
            this.avatar = userInfo.avatar;
            this.roles = userInfo.roles;
        },

        // 清除用户信息（比如退出登录时用）
        clearUserInfo() {
            this.token = '';
            this.username = '';
            this.roles = [];
            this.nickname = '';
            this.avatar = '';
        },

    },
    persist: true, // 如果你想把用户信息自动持久化到 localStorage，可以加上这个（需要 pinia-plugin-persistedstate 插件）
})
