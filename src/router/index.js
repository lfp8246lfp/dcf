import Vue from 'vue';
import VueRouter from 'vue-router';
// import Permission from '../api/Permission';
import routes from './routes';

Vue.use(VueRouter);

let router = new VueRouter({
    routes,
    mode: 'history'
});

let arr = ['/login', '/register1', '/forget1']

// 路由权限控制
router.beforeEach(async (to, from, next) => {
    if (arr.includes(to.path)) {
        next()
    } else if (to.path === '/register2') {
        if (from.path === '/register1') {
            next()
        } else {
            next('/enter')
        }
    } else if (to.path === '/register3') {
        if (from.path === '/register2') {
            next()
        } else {
            next('/enter')
        }
    } else if (to.path === '/forget2') {
        if (from.path === '/forget1') {
            next()
        } else {
            next('/enter')
        }
    } else if (to.path === '/forget3') {
        if (from.path === '/forget2') {
            next()
        } else {
            next('/enter')
        }
    } else {
        let token = localStorage.getItem('HTTP_ACCESS_TOKEN')
        if (!token) return next('/enter')
        next()
    }
});

// export const constantRoutes = routes;

export default router;
