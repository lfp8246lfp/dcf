import {http, http1} from './http';
export default [
    // 查询电价
    {
        name: 'electricityPrice',
        method: 'get',
        url: http + '/service/archivesservice/PropertyManageService/electricityPrice'
    },
    // wifi表电价管理
    {
        name: 'optWifiPrice',
        method: 'post',
        url: http + '/service/archivesservice/PropertyManageService/optWifiPrice'
    },
    // 充电桩价格管理
    {
        name: 'optCharingPrice',
        method: 'post',
        url: http + '/service/archivesservice/PropertyManageService/optCharingPrice'
    },
];