import {http, http1} from './http';
export default [
    {
        name: 'login',
        method: 'post',
        url: http + '/service/authservice/AuthService/loginIn'
    },
    {
        name: 'getMenuList',
        method: 'post',
        url: http + '/service/authservice/AuthService/getMenu'
    },
];