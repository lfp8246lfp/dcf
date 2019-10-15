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
                path: '/home',
                component: Home
            },
            {
                path: 'fileManage',
                component: resolve => require(['views/fileManage'], resolve)
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
