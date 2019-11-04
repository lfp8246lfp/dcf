import loginApi from './login.api';
import homeApi from './home.api';
import incomeStatistics from './incomeStatistics.api'
import powerStatistics from './powerStatistics.api'
import billManage from './billManage.api'
import manageUnit from './manageUnit.api'
import withdrawManage from './withdrawManage.api'
import priceManage from './priceManage.api'
const apis = [
    ...loginApi,
    ...homeApi,
    ...incomeStatistics,
    ...powerStatistics,
    ...billManage,
    ...manageUnit,
    ...withdrawManage,
    ...priceManage,
];

export default apis;
