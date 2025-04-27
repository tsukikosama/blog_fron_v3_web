import { createRouter, createWebHistory } from 'vue-router'


const routes = [
    { path: '/', name: 'Home', component: () => import('../page/MyHomePage.vue') },
    { path: '/treasure', name: '宝藏', component: () => import('../page/PublicBlog.vue') },
    { path: '/picture', name: '美图', component: () => import('../page/Picture.vue') },
    { path: '/blogDetail/:id', name: '博客详情', component: () => import('../page/BlogPage.vue') }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
