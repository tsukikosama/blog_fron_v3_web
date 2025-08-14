import { createRouter, createWebHistory } from 'vue-router'


const routes = [
    { path: '/', name: 'Home', component: () => import('../page/MyHomePage.vue') },
    { path: '/treasure', name: '宝藏', component: () => import('../page/BlogType.vue') },
    { path: '/picture', name: '美图', component: () => import('../page/Picture.vue') },
    { path: '/blogDetail/:id', name: '博客详情', component: () => import('../page/BlogPage.vue') },
    { path: '/login', name: '登录页面', component: () => import('../page/LoginPage.vue') },
    { path: '/friendLink', name: '友链界面', component: () => import('../page/FriendLinkPage.vue') },
    { path: '/register', name: '注册界面', component: () => import('../page/RegisterPage.vue') },
    { path: '/timeLine', name: '归档界面', component: () => import('../page/ArchivePage.vue') },
    { path: '/messageBoard', name: '留言板', component: () => import('../page/MessageBoardPage.vue') },
    { path: '/biubiubiu', name: '弹幕测试', component: () => import('../page/BiubiubiuPage.vue') },
    { path: '/test', name: 'test', component: () => import('../components/Reply.vue') }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
