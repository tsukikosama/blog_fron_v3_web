import { createRouter, createWebHistory } from 'vue-router'


const routes = [
    { path: '/', name: 'Home', component: () => import('../page/MyHomePage.vue') },
    { path: '/treasure', name: '宝藏', component: () => import('../page/PublicBlog.vue') },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
