/**uass登录地址 */
export default {
  getUassLoginUrl() {
    return import.meta.env.VITE_APP_TITLE === 'production'
      ? 'http://60.0.191.241:8084/supusso/login.sso'
      : 'http://128.1.124.78:8084/supusso/login.sso';
    //: 'http://128.1.124.79:9118';
  },

  getUassLogoutUrl() {
    return import.meta.env.VITE_APP_TITLE === 'production'
      ? 'http://60.0.191.241:8084/supusso/logout.sso'
      : 'http://128.1.124.78:8084/supusso/logout.sso';
  },

  getUassLoginCheck() {
    return import.meta.env.VITE_APP_TITLE === 'production'
      ? 'http://60.0.191.241:8084/supusso/checkAuth.sso'
      : 'http://128.1.124.78:8084/supusso/checkAuth.sso';
  },
};
