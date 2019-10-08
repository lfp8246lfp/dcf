import CommonRouter from './common.router';
import SubLayout from '../views/subLayout/index.vue';
import remotecontrolrouer from './remotecontrol.router'
const routes = [
    {
        path: '/',
        component: SubLayout,
        redirect: '/operationmanagement/filemanagement',
        children: [
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
        name: 'login',
        path: '/login',
        component: resolve => require(['views/login'], resolve)
    },
];

export default routes;
