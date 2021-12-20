import cookies from 'js-cookie';

export const isLogin = (): boolean => {
  if (cookies.get('access_token') || cookies.get('refresh_token')) {
    return true;
  }
  return false;
};

export const logoutUser = (): void => {
  cookies.remove('access_token');
  cookies.remove('refresh_token');
};
