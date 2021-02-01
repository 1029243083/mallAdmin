import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
const routes: RouteRecordRaw[] = [
    { path: '/login', component: import('../view/Login.vue') },
    { path: '/Registered', component: import('../view/Registered.vue') },
    {
        path: '/', component: import('../view/Home.vue'), children: [
            { path: 'statistics', component: import('../components/Statistics.vue') },
            { path: 'goodslist', component: import('../components/GoodsList.vue') },
            { path: 'addgoods', component: import('../components/AddGods.vue') }

        ]
    }
];
const router = createRouter({
    history: createWebHistory(),
    routes: routes
})
export default router;