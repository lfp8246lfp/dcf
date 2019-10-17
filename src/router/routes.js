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
        redirect: '/home',
        children: [
            {
                name: 'shou',
                path: '/home',
                component: Home,
                meta: {
                    activeMenu: '/home',
                    title: '首页',
                    noCache: true,
                    affix: false
                }
            },
            {
                name: 'fileManage',
                path: '/fileManage',
                component: resolve => require(['views/fileManage'], resolve),
                meta: {
                    activeMenu: '/fileManage',
                    title: '档案管理',
                    noCache: true,
                    affix: false
                }
            },
            {
                name: 'incomeStatistics',
                path: '/incomeStatistics',
                component: resolve => require(['views/incomeStatistics'], resolve),
                meta: {
                    activeMenu: '/incomeStatistics',
                    title: '收入统计',
                    noCache: true,
                    affix: false
                }
            },
            {
                name: 'energyStatistics',
                path: '/energyStatistics',
                component: resolve => require(['views/energyStatistics'], resolve),
                meta: {
                    activeMenu: '/energyStatistics',
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
