import loginApi from './login.api';
import homeApi from './home.api';
import incomeStatistics from './incomeStatistics.api';
import powerStatistics from './powerStatistics.api';
import billManage from './billManage.api';
const apis = [
    ...loginApi,
    ...homeApi,
    ...incomeStatistics,
    ...powerStatistics,
    ...billManage,
];

export default apis;
