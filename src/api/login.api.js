import {http, http1} from './index';
export default [
    {
        name: 'login',
        method: 'post',
        url: http + '/service/authservice/AuthService/loginIn'
    },
    {
        name: 'getMenuList',
        method: 'get',
        url: http + '/service/authservice/AuthService/getMenuList?systemid=-1'
    },
];