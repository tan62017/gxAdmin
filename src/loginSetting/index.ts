import uassLogin from './uassLogin';
export default {
  /**系统登录类型（0-本地登录，1-uass登录，2-支持两种登录方式*/
  loginType: 1,
  /**统一平台录入的系统id*/
  uassSysId: 'gxdataadmin',
  //uassSysId: '',
  uassLoginUrl: uassLogin.getUassLoginUrl(),
  uassLogoutUrl: uassLogin.getUassLogoutUrl(),
  uassLoginCheck: uassLogin.getUassLoginCheck(),
};
