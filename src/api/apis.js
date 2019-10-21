import loginApi from './login.api';
import homeApi from './home.api';
import incomeStatistics from './incomeStatistics.api';
import powerStatistics from './powerStatistics.api';
const apis = [
    ...loginApi,
    ...homeApi,
    ...incomeStatistics,
    ...powerStatistics,
];

export default apis;
