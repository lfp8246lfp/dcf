import {http, http1} from './http';
export default [
    {
        name: 'getUnitList',
        method: 'get',
        url: http + '/service/analysisservice/PropertyIndexService/getUnitList'
    },
    {
        name: 'optUnit',
        method: 'post',
        url: http + '/service/analysisservice/PropertyIndexService/optUnit'
    },
    // 房间下设备集合
    {
        name: 'getRoomRtuList',
        method: 'get',
        url: http + '/service/archivesservice/PropertyManageService/getRoomRtuList'
    },
    // wifi表新增修改
    {
        name: 'addDevInfo',
        method: 'post',
        url: http + '/service/archivesservice/PropertyManageService/addDevInfo'
    },
    // 电价查询
    {
        name: 'getSinglePriceList',
        method: 'get',
        url: http + '/service/archivesservice/PropertyManageService/getSinglePriceList'
    },
    // 删除房间下设备
    {
        name: 'deleteDevInfo',
        method: 'post',
        url: http + '/service/archivesservice/PropertyManageService/deleteDevInfo'
    },
    {
        name: 'queryCharging',
        method: 'get',
        url: http + '/service/archivesservice/PropertyManageService/queryCharging'
    },
    {
        name: 'optRtuInfo',
        method: 'post',
        url: http + '/service/archivesservice/WeiXinService/optRtuInfo'
    },
    // 导出管理单位下设备集合
    {
        name: 'exportRoomRtuList',
        method: 'post',
        url: http + '/service/download/archivesservice/PropertyManageService/exportRoomRtuList'
    },
    // 导出充电桩设备信息
    {
        name: 'exportCharging',
        method: 'post',
        url: http + '/service/download/archivesservice/PropertyManageService/exportCharging'
    },
    // 导出管理单位
    {
        name: 'exportUnitList',
        method: 'post',
        url: http + '/service/download/analysisservice/PropertyIndexService/exportUnitList'
    },
];