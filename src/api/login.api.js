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
    {
        name: 'sendMessage',
        method: 'get',
        url: http + '/service/archivesservice/WeiXinService/sendMessageCode'
    },
    {
        name: 'findPassword',
        method: 'post',
        url: http + '/service/authservice/PropertyManageService/findPassword'
    },
    {
        name: 'register',
        method: 'post',
        url: http + '/service/authservice/PropertyManageService/register'
    },

];