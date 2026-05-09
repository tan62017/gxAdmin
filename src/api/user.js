import Http from '@/http';

// const Http = new http();

export const getUserInfo = () => {
  return Http.get('/api/auth/getAuthInfo');
};

export const login = (data) => {
  return Http.post('/api/auth/login', data);
};
