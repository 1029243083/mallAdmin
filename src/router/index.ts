import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
const routes: RouteRecordRaw[] = [
    { path: '/login', component: import('../view/Login.vue') },
    { path: '/Registered', component: import('../view/Registered.vue') },
    { path: '/', component: import('../view/Home.vue') }
];
const router = createRouter({
    history: createWebHistory(),
    routes: routes
})
export default router;