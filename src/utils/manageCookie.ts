import { getCookie, removeCookie, setCookie } from 'typescript-cookie';
import {
  COOKIE_KEY,
  USER_NAME,
  LOGGED_IN,
  NAME,
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  LOGIN_TIME
} from '@/utils/constant';

const decode = (str: string): string =>
  Buffer?.from(str || '', 'base64')?.toString('binary');
const encode = (str: string): string =>
  Buffer?.from(str || '', 'binary')?.toString('base64');

export const setCookieAuth = (
  isLoggin: boolean,
  userName: string,
  name: string,
  accessToken: string,
  refreshToken: string
) => {
  if (isLoggin) {
    setCookie(
      LOGIN_TIME,
      encode(encode(COOKIE_KEY) + encode(new Date().toString()))
    );

    setCookie(USER_NAME, encode(encode(COOKIE_KEY) + encode(userName)));
    setCookie(LOGGED_IN, encode(encode(COOKIE_KEY) + encode('true')));
    setCookie(NAME, encode(encode(COOKIE_KEY) + encode(name)));
    setCookie(ACCESS_TOKEN, accessToken);
    setCookie(REFRESH_TOKEN, refreshToken);
  }
};

export const getCookieAuth = (cookieName: string): string => {
  let cookieDecode = decode(getCookie(cookieName) || '');
  let array = cookieDecode.split(encode(COOKIE_KEY));
  return array.length > 0 ? decode(array[1]) : '';
};

export const removeCookieAuth = () => {
  console.log('logout e');
  removeCookie(LOGGED_IN);
  removeCookie(USER_NAME);
  removeCookie(LOGIN_TIME);
  removeCookie(NAME);
  removeCookie(ACCESS_TOKEN);
  removeCookie(REFRESH_TOKEN);
};
