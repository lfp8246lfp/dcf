import {http, http1} from './http';
export default [
    {
        name: 'energyStatistics',
        method: 'get',
        url: http + '/service/analysisservice/PropertyIndexService/energyStatistics'
    },
    {
        name: 'energyStatisticsDetail',
        method: 'get',
        url: http + '/service/analysisservice/PropertyIndexService/energyStatisticsDetail'
    },
];