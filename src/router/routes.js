import CommonRouter from './common.router'
import SubLayout from '../views/subLayout/index.vue'
import remotecontrolrouer from './remotecontrol.router'
import loginRouter from './login.router'
import Enter from '../views/enter/index.vue'
import Home from '../views/home/index.vue'


const routes = [
    {
        path: '/',
        component: SubLayout,
        // redirect: '/operationmanagement/filemanagement',
        redirect: '/index',
        children: [
            {
                name: 'home',
                path: '/index',
                component: Home,
                meta: {
                    activeMenu: '/index',
                    title: '首页',
                    noCache: true,
                    affix: false
                }
            },
            {
                name: 'archivesManage',
                path: '/archivesmanage',
                component: resolve => require(['views/archivesManage'], resolve),
                meta: {
                    activeMenu: '/archivesmanage',
                    title: '档案管理',
                    noCache: true,
                    affix: false
                }
            },
            {
                name: 'incomeStatistics',
                path: '/incomestatistics',
                component: resolve => require(['views/incomeStatistics'], resolve),
                meta: {
                    activeMenu: '/incomestatistics',
                    title: '收入统计',
                    noCache: true,
                    affix: false
                }
            },
            {
                name: 'powerStatistics',
                path: '/powerstatistics',
                component: resolve => require(['views/powerStatistics'], resolve),
                meta: {
                    activeMenu: '/powerStatistics',
                    title: '用能统计',
                    noCache: true,
                    affix: false
                }
            },
            {
                name: 'incomeManage',
                path: '/incomemanage',
                component: resolve => require(['views/incomemanage'], resolve),
                meta: {
                    activeMenu: '/incomemanage',
                    title: '收入管理',
                    noCache: true,
                    affix: false
                }
            },
            {
                name: 'billManage',
                path: '/billmanage',
                component: resolve => require(['views/billManage'], resolve),
                meta: {
                    activeMenu: '/billmanage',
                    title: '用能统计',
                    noCache: true,
                    affix: false
                }
            },
            {
                name: 'valueAddService',
                path: '/valueaddservice',
                component: resolve => require(['views/valueAddService'], resolve),
                meta: {
                    activeMenu: '/valueaddservice',
                    title: '用能统计',
                    noCache: true,
                    affix: false
                }
            },
            {
                name: 'priceManage',
                path: '/priceManage',
                component: resolve => require(['views/priceManage'], resolve),
                meta: {
                    activeMenu: '/priceManage',
                    title: '用能统计',
                    noCache: true,
                    affix: false
                }
            },
            // {
            //     name: 'amihome',
            //     path: '/amihome',
            //         component: resolve => require(['views/amihome'], resolve),
            //         meta: {
            //         activeMenu: '/amihome',
            //         title: 'amihome',
            //         noCache: true,
            //         affix: true
            //     }
            // },
            ...remotecontrolrouer,
            ...CommonRouter
        ]
    },
    {
        path: '/enter',
        component: Enter,
        redirect: '/login',
        children: [
            ...loginRouter
        ]
    }
];

export default routes;
