import Vue from 'vue';
import VueRouter from 'vue-router';
// import Permission from '../api/Permission';
import routes from './routes';

Vue.use(VueRouter);

let router = new VueRouter({
    routes,
    mode: 'history'
});

let arr = ['/login', '/register1', '/register2', '/register3', '/forget1', '/forget2', '/forget3']

// 路由权限控制
router.beforeEach(async (to, from, next) => {
    if (arr.includes(to.path)) {
        next();
    } else {
        let token = localStorage.getItem('HTTP_ACCESS_TOKEN');
        if (token == undefined) {
            // next('/enter');
            next()
        } else {
            next();
        }
    }
});

// export const constantRoutes = routes;

export default router;
