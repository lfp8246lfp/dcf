import {http, http1} from './http';
export default [
  // 提现页详情
    {
        name: 'withdrawDetail',
        method: 'get',
        url: http + '/service/analysisservice/PropertyIndexService/withdrawDetail'
    },
  // 提现申请
    {
        name: 'addWithdrawLog',
        method: 'post',
        url: http + '/service/analysisservice/PropertyIndexService/addWithdrawLog'
    },
];