import cookies from 'js-cookie';

export const isLogin = (): boolean => {
  if (cookies.get('access_token') || cookies.get('refresh_token')) {
    return true;
  }
  return false;
};

