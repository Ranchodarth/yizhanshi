import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/entry'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "entry" */ '../components/common/Home.vue'),
            meta: { title: '公共' },
            children: [
                {
                    path: '/role',
                    component: () => import(/* webpackChunkName: "role" */ '../components/page/role.vue'),
                    meta: { title: '角色管理' }
                },
                {
                    path: '/user',
                    component: () => import(/* webpackChunkName: "user" */ '../components/page/user.vue'),
                    meta: { title: '用户管理' }
                },
                {
                    path: '/busi',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/busi.vue'),
                    meta: { title: '企业单位信息维护' }
                },
                {
                    // vue-schart组件
                    path: '/entry',
                    component: () => import(/* webpackChunkName: "entry" */ '../components/page/entry.vue'),
                    meta: { title: '统一入口' }
                },
                {
                    path: '/declare',
                    component: () => import(/* webpackChunkName: "declare" */ '../components/page/declare.vue'),
                    meta: { title: '申报查询及处理' }
                },
                {
                    path: '/talents',
                    component: () => import(/* webpackChunkName: "talents" */ '../components/page/talents.vue'),
                    meta: { title: '人才库' }
                },
                {
                    path: '/banks',
                    component: () => import(/* webpackChunkName: "banks" */ '../components/page/banks.vue'),
                    meta: { title: '银行管理' }
                },
                {
                    path: '/cards',
                    component: () => import(/* webpackChunkName: "cards" */ '../components/page/cards.vue'),
                    meta: { title: '银行卡汇总' }
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                }
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
