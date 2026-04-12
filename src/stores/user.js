import { defineStore } from 'pinia';
import { sleep, useLocalStorage } from '@/utils';
import router, { defaultRoutes } from '@/router';
import { checkToken as _checkToken, login as _login, getUserInfoByToken } from '@/api';

// class Token {
//   static SUPER = 'super64f549fed8a14057926358a635f'
// }

export const useUserStore = defineStore('user', () => {
  const search = new URLSearchParams(window.location.href.split('?')[1]);
  const _token = search.get('token');
  const token = useLocalStorage('token', '');
  const isLogin = ref(import.meta.env.VITE_IGNORED_LOGIN === '1');

  const authRoutes = ref(defaultRoutes);
  if (_token) {
    token.value = _token;
  }

  const userInfo = ref({});

  const registerAuthMenu = () => {
    authRoutes.value.forEach((route) => router.addRoute(route));
    if (token.value && userInfo.value.isAdmin) {
      // authRoutes.forEach((route) => router.addRoute(route));
    }
  };

  const getUserInfo = async () => {
    const [err, data] = await to(getUserInfoByToken({ token: token.value }));
    if (!err) {
      userInfo.value = {
        ...data,
        isAdmin: data.userName === 'admin',
      };
    } else {
      userInfo.value = {};
      ElMessage.error('获取用户信息失败');
    }
    if (userInfo.value.isAdmin) {
      registerAuthMenu();
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
      const checkToken = async () => {
        const [err, status] = await to(
          _checkToken({
            token: token.value,
          }),
        );
        if (err) {
          return false;
        }
        return status.tokenStatus;
      };

      const pass = await checkToken();
      if (pass) {
        isLogin.value = true;
        await getUserInfo();
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const customLogin = async (user) => {
    const { err, data } = await _login(user);
    // console.log(.);

    if (!data || data.code !== 200 || err) {
      ElMessage.error(data?.message || err.message);
      return false;
    }
    token.value = data.data;
    console.log('customLogin', user);
    return true;
  };

  const logout = async () => {
    token.value = '';
    await sleep(300);
    toLogin();
  };

  return {
    authRoutes,
    token,
    login,
    userInfo,
    registerAuthMenu,
    isLogin,
    logout,
    toLogin,
    toThirdLogin,
    customLogin,
  };
});
