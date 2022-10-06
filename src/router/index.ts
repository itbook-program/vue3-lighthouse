import {createRouter, createWebHistory } from 'vue-router';
import { getToken, getUser } from '@/utils/auth';
import { getArtUser } from '@/api/artUser';
import store from '@/store/index';
const routes = [
    {
        path: '/',
        redirect: '/homePage',
    },
    {
        path: '/editArt',
        component: () => import('@/pages/personal/components/artPub.vue')
    },
    {
        path: '/homePage',
        name: 'homePage',
        component: () => import('@/pages/homePage/index.vue')
    },
    {
        path: '/userPage',
        component: () => import('@/pages/article/index.vue'),
        redirect: '/:id',
        children: [
            {
                path: '/:id',
                name: 'userList',
                component: () => import('@/pages/artList/index.vue')
            },
            {
                path: '/:id/:artId',
                name: 'userArtDetail',
                component: () => import('@/pages/artDetail/index.vue')
            }
        ]
    },
    {
        path: '/personal',
        component: () => import('@/pages/personal/index.vue'),
        redirect: '/personal/article',
        children: [
            {
                path: 'artPub',
                component: () => import('@/pages/personal/components/artPub.vue')
            },
            {
                path: 'article',
                component: () => import('@/pages/personal/components/article.vue')
            },
            {
                path: 'subscribe',
                component: () => import('@/pages/personal/components/subscribe.vue')
            },
            {
                path: 'subSetting',
                component: () => import('@/pages/personal/components/subSetting.vue')
            },
            {
                path: 'money',
                component: () => import('@/pages/personal/components/money.vue')
            },
            {
                path: 'profile',
                component: () => import('@/pages/personal/components/profile.vue')
            },
            {
                path: 'account',
                component: () => import('@/pages/personal/components/account.vue')
            },
            {
                path: '/detail/:artId',
                name: 'userArticleDetail',
                component: () => import('@/pages/artDetail/index.vue')
            }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(), //替代之前的mode，是必须的
    scrollBehavior(to, from, savedPosition) {
        return { top: 0, behavior: 'smooth' }
    },
    routes
});
router.beforeEach(async (to, from) => {
    // 判断当前用户情况
    if(getToken() && getUser() && !store.state.user){
        try {
            const { code, data } = await getArtUser(getUser())
            store.commit('setUserActive', data)
        } catch (error) {
            console.log('请求失败')
        }
        return true
    }
})
export default router;