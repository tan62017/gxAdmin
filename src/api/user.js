import Http from '@/http';

// const Http = new http();

export const getUserInfo = () => {
  return Http.get('/api/auth/getAuthInfo');
};

export const login = (data) => {
  return Http.post('/api/auth/login', data, {
    showLoading: true,
    cancelKey: '_api_auth_login_cancelKey',
  });
};

export const getUserByToken = () => {
  return Http.get('/api/user/me');
};

export const logout = () => {
  return Http.post('/api/auth/logout');
};
