import Vue from 'vue';
import moment from 'moment';
import '../api/index';
import i18n from '../i18n/index';
const filters = {

    /**
     * 13422334455 转 134 2233 4455
     * @param mobile
     * @returns {string}
     */
    mobileAddSpace (mobile) {
        return mobile.toString().replace(/^(\d{3})(\d{4})(\d{4})$/, '$1 $2 $3');
    },

    /**
     * 将毫秒数时间转化为yyyy-MM-dd
     * @param time
     */
    longTimeToDefaultFormatDate (time) {
        if (!time) return '';
        return moment(new Date(time)).format('YYYY-MM-DD HH:mm:ss');
    },

    /**
     * 常量过滤器，接受常量对象
     * @param classArr
     * @param input
     * @returns {*}
     */
    constantsFilterArr (input, classArr) {
        if (!input || input === undefined) {
            return '';
        }
        if (classArr) {
            if (Array.isArray(classArr) && classArr.length > 0) {
                for (let i = 0, len = classArr.length; i < len; i++) {
                    if (classArr[i].code + '' === input + '') {
                        return classArr[i].label;
                    }
                }
            }
            if (classArr[input]) {
                return classArr[input];
            } else {
                return '';
            }
        } else {
            return '';
        }
    },
    numFilter (value) {
        let realVal = parseFloat(value).toFixed(2);
        return parseFloat(realVal);
    },

    changeCommType (value) {
        if (value == 1) {
            return i18n.t('item.wifi');
        } else if (value == 2) {
            return i18n.t('item.nb');
        } else if (value == 3) {
            return i18n.t('item.gprs');
        } else if (value == 4) {
            return i18n.t('item.plc');
        } else if (value == 5) {
            return i18n.t('item.485');
        } else if (value == 6) {
            return i18n.t('item.lora');
        }
    },
    getPostTypeIcon ({objtype,curstatus}) {
        if (objtype == 30) {
            return '../../static/images/global.png';
        } else if (objtype == 31) {
            return '../../static/images/city.png';
        } else if (objtype == 32) {
            return '../../static/images/build.png';
        } else if (objtype == 33) {
            return '../../static/images/street.png';
        } else if (objtype == 34) {
            return '../../static/images/point.png';
        } else if (objtype == 1&& curstatus==0) {
            return '../../static/images/outline.png';
        } else if (objtype == 1&& curstatus==1) {
            return '../../static/images/online.png';
        } else if (objtype == 10) {
            return '../../static/images/meter.png';
        }
    },
    isTrueorFalse(val){
        if(val==0){
            return i18n.t('common.false');
        }else{
            return i18n.t('common.true');
        }
    },
    changeSyncstatus(val){
        if(val==1){
            return i18n.t('common.synch');
        }else if(val==0){
            return i18n.t('common.unsynch');
        }else {
            return ''
        }
    },
    changeOnline(val){
        if(val==1){
            return i18n.t('common.online');
        }else if(val==0){
            return i18n.t('common.offline');
        }
    }

};

for (let key of Object.keys(filters)) {
    Vue.filter(key, filters[key]);
}
