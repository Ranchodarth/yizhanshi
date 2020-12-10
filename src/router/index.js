import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/role'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/role',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/role.vue'),
                    meta: { title: '角色管理' }
                },
                {
                    path: '/user',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/user.vue'),
                    meta: { title: '用户管理' }
                },
                {
                    path: '/tabs',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/Tabs.vue'),
                    meta: { title: '企业单位信息维护' }
                },
                {
                    // vue-schart组件
                    path: '/entry',
                    component: () => import(/* webpackChunkName: "chart" */ '../components/page/entry.vue'),
                    meta: { title: '统一入口' }
                },
                {
                    path: '/declare',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/declare.vue'),
                    meta: { title: '申报查询及处理' }
                },
                {
                    path: '/talents',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/talents.vue'),
                    meta: { title: '人才库' }
                },
                {
                    path: '/banks',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/banks.vue'),
                    meta: { title: '银行管理' }
                },
                {
                    path: '/cards',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/cards.vue'),
                    meta: { title: '银行卡汇总' }
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: () => import(/* webpackChunkName: "upload" */ '../components/page/Upload.vue'),
                    meta: { title: '文件上传' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: () => import(/* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
                    meta: { title: '权限测试', permission: true }
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
