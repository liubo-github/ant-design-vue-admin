// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView, PageView } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

export const asyncRouterMap = [
    {
        path: '/',
        name: 'index',
        component: BasicLayout,
        meta: { title: '首页' },
        redirect: '/dashboard',
        children: [
            // dashboard
            {
                path: '/dashboard',
                name: 'dashboard',
                redirect: '/dashboard',
                component: RouteView,
                hideChildrenInMenu: true,
                meta: {
                    hidden: true,
                    title: '首页',
                    keepAlive: true,
                    icon: bxAnaalyse,
                    permission: ['admin'],
                },
                children: [
                    {
                        path: '',
                        name: 'Analysis',
                        component: () => import('@/views/dashboard/Analysis'),
                        meta: { title: '分析页', keepAlive: false, permission: ['admin'] }
                    },
                ]
            },

            // {
            //     path: '/setting',
            //     name: 'setting',
            //     component: PageView,
            //     meta: {
            //         title: '系统设置',
            //         icon: 'setting',
            //         permission: ['admin'],
            //     },
            //     children: [
            //         {
            //             path: '/base-form',
            //             name: 'BaseForm',
            //             component: () => import('@/views/form/BasicForm'),
            //             meta: { title: '基础表单', keepAlive: true, permission: ['admin'] }
            //         },
            //     ]
            // },

            // forms
            {
                path: '/form',
                component: PageView,
                redirect: '/form/base-form',
                meta: { title: '表单页', keepAlive: true, icon: 'form', permission: ['admin'] },
                children: [
                    {
                        path: '/form/base-form',
                        name: 'BaseForm',
                        component: () => import('@/views/form/BasicForm'),
                        meta: { 
                            title: '基础表单', 
                            keepAlive: true, 
                            permission: ['admin'],
                        }
                    },
                ]
            },

            // account
            {
                path: '/account',
                component: RouteView,
                redirect: '/account/center',
                name: 'account',
                meta: { title: '个人页', icon: 'user', keepAlive: true, permission: ['admin'] },
                children: [
                    {
                        path: '/account/center',
                        name: 'center',
                        component: () => import('@/views/user/Center'),
                        meta: { title: '个人中心', keepAlive: true, permission: ['admin'] }
                    },
                ]
            },
        ]
    },
    {
        path: '*', redirect: '/404', hidden: true
    }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
    {
        path: '/user',
        component: UserLayout,
        redirect: '/user/login',
        hidden: true,
        children: [
            {
                path: 'login',
                name: 'login',
                component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
            },
        ]
    },

    {
        path: '/404',
        component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
    }

]
