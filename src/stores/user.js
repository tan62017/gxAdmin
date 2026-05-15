import { defineStore } from 'pinia';
import {
  sleep,
  useLocalStorage,
  getLocalUser,
  setToken,
  setLocalUser,
  removeToken,
  removeLocalUser,
} from '@/utils';
import router, { defaultRoutes } from '@/router';
import { login as _login, getUserByToken as _getUserInfo, logout as _logout } from '@/api/user';
import loginSetting from '@/loginSetting';

// class Token {
//   static SUPER = 'super64f549fed8a14057926358a635f'
// }

export const useUserStore = defineStore('user', () => {
  const search = new URLSearchParams(window.location.href.split('?')[1]);
  const _token = search.get('token');
  const _isAdmin = search.get('role') === 'admin';
  const token = useLocalStorage('token', '');
  const isLogin = ref(import.meta.env.VITE_IGNORED_LOGIN === '1');
  const loginLoading = ref(false);
  const loginText = ref('正在登录...');

  const authRoutes = ref(defaultRoutes);
  if (_token) {
    token.value = _token;
    setToken(_token);
  }
  console.log(getLocalUser(), 'getLocalUser()????????');

  const userInfo = ref(getLocalUser() || {});

  const registerAuthMenu = () => {
    authRoutes.value.forEach((route) => router.addRoute(route));
    if (token.value && userInfo.value.isAdmin) {
      // authRoutes.forEach((route) => router.addRoute(route));
    }
  };

  const getUserInfo = async (callBack) => {
    loginLoading.value = true;
    if (_token) {
      try {
        loginText.value = '正在获取用户信息...';
        const res = await _getUserInfo();

        if (res.code === 200) {
          const userMsg = { ...res.data, token: _token };
          setLocalUser(userMsg);
          userInfo.value = userMsg;
        }
        const timer = setTimeout(() => {
          clearTimeout(timer);
          loginLoading.value = false;
          if (callBack) {
            callBack();
          }
        }, 1000);
      } catch (error) {
        loginLoading.value = false;
      }
    } else {
      if (!_isAdmin) {
        loginText.value = '准备跳转到统一认证平台...';
        // loginText.value = '正在跳转到统一认证平台...';
        await sleep(1000);
        loginLoading.value = false;
        // uassLogin();
      } else {
        loginLoading.value = false;
      }
    }
  };

  const toThirdLogin = (logout) => {
    const origin = import.meta.env.VITE_LOGIN_URL;
    const query = router.currentRoute.value.query;
    const { redirect } = query;
    location.assign(
      `${origin}?target=${location.href.replace('/login', '')}${redirect}${
        logout ? '#/login' : ''
      }`,
    );
  };
  /**
   * uass登录方法
   */
  function uassLogin() {
    window.location.href = loginSetting.uassLoginUrl + '?sysId=' + loginSetting.uassSysId;
  }
  const toLogin = () => {
    router.push({
      name: 'login',
    });
  };

  const login = async () => {
    if (isLogin.value) {
      return userInfo.value;
    }
    if (token.value) {
      const checkToken = async () => {};
    } else {
      return false;
    }
  };

  const customLogin = async (user) => {
    const res = await _login(user);

    if (res.code === 200) {
      token.value = res.data.token;
      isLogin.value = true;
      setToken(res.data?.token);
      setLocalUser(res.data);
      userInfo.value = res.data;
      return true;
      // await getUserInfo();
    } else {
      return false;
    }
    // // console.log(.);

    // if (!data || data.code !== 200 || err) {
    //   ElMessage.error(data?.message || err.message);
    //   return false;
    // }
    // token.value = data.data;
    // console.log('customLogin', user);
  };

  const logout = async () => {
    removeToken();
    removeLocalUser();
    // await sleep(300);
    await _logout();
    toLogin();
  };

  const getToken = () => {
    return token.value;
  };

  return {
    loginLoading,
    loginText,
    authRoutes,
    token,
    userInfo,
    isLogin,
    login,
    getUserInfo,
    registerAuthMenu,
    getToken,
    logout,
    toLogin,
    toThirdLogin,
    customLogin,
  };
});
