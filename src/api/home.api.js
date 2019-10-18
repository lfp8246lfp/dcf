import {http, http1} from './http';
export default [
    {
        name: 'homeData',
        method: 'get',
        url: http + '/service/analysisservice/PropertyIndexService/departInCome'
    },
    {
        name: 'recentEarnings',
        method: 'get',
        url: http + '/service/analysisservice/PropertyIndexService/recentEarnings'
    },
];