import http from '@/http';

const Http = new http();

export const getUserInfo = () => {
  return Http.get('/api/auth/getAuthInfo')
};
