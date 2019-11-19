import {http, http1} from './http';
export default [
    {
        name: 'revenueStatistics',
        method: 'get',
        url: http + '/service/analysisservice/PropertyIndexService/revenueStatistics'
    },
    {
        name: 'exprotRevenueStatistics',
        method: 'post',
        url: http + '/service/download/analysisservice/PropertyIndexService/exprotRevenueStatistics'
    },
];