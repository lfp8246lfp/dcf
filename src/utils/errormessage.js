import i18n from '../i18n/index';
export class Utils {
  getErrorMsg(errortype , errorcode )  {
    let msg  = '';
    if (errortype == "0") {
      msg = "sitemanage.errortype0";
    } else if (errortype == "1") {
      if (errorcode == "0") {
        msg = "sitemanage.errorcode1_0";
      } else
      if (errorcode == "1") {
        msg = "sitemanage.errorcode1_1";
      } else
      if (errorcode == "2") {
        msg = "sitemanage.errorcode1_2";
      } else
      if (errorcode == "3") {
        msg = "sitemanage.errorcode1_3";
      } else
      if (errorcode == "4") {
        msg = "sitemanage.errorcode1_4";
      } else {
        msg = "sitemanage.errorcode1_other";
      }
    } else if (errortype == "2" || errortype == "3") {
      if (errorcode == "0") {
        msg = "sitemanage.errorcode23_0";
      } else if (errorcode == "3") {
        msg = "sitemanage.errorcode23_3";
      } else if (errorcode == "4") {
        msg = "sitemanage.errorcode23_4";
      } else if (errorcode == "12") {
        msg = "sitemanage.errorcode23_12";
      } else {
        msg = "sitemanage.errorcode23_other";
      }
    } else if (errortype == "4") {
      msg = "sitemanage.errortype4";
    } else {
      msg = "sitemanage.errortypeother";
    }

    return i18n.t(msg);
  }
}