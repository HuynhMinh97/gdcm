import { useLogoutMutation } from '@/redux/api/auth/auth.api';
import { LOGGED_IN, LOGIN_TIME, NAME } from '@/utils/constant';
import { getCookieAuth, removeCookieAuth } from '@/utils/manageCookie';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Main = () => {
  const name = (typeof document !== 'undefined' && getCookieAuth(NAME)) || '';
  const loginTime =
    (typeof document !== 'undefined' && getCookieAuth(LOGIN_TIME)) || '';
  console.log('home ne');
  const [logout] = useLogoutMutation();
  const router = useRouter();
  const logOut = () => {
    logout()
      .unwrap()
      .then(() => {
        removeCookieAuth();
        console.log('logout 213');
        console.log(getCookieAuth(LOGGED_IN));
        router.push('/auth/login', '/auth/login', { scroll: true });
      })
      .catch(() => {});
  };
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Perform client-side data fetching
      // ...
    }
  }, []);
  return (
    <>
      <h1>user: {name}</h1>
      <h3>loginTime: {loginTime}</h3>
      <button onClick={() => logOut()} className='bg-blue-800'>
        Logout
      </button>
    </>
  );
};

export default Main;
