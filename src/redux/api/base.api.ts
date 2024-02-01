import { tokenReceived } from '@/redux/services/auth/auth.slice';
import { TRefreshToken } from '@/types/auth/login/TRefreshToken';
import { ACCESS_TOKEN, BASE_URL, REFRESH_TOKEN } from '@/utils/constant';
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError
} from '@reduxjs/toolkit/query';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';
import { getCookie } from 'typescript-cookie';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: headers => {
    // By default, if we have a token in the store, let's use that for authenticated requests
    const token = getCookie(ACCESS_TOKEN);
    console.log('token', token);

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
      // headers.set('Access-Control-Expose-Headers', 'Content-Disposition')
    }
    return headers;
  }
});
const mutex = new Mutex();
const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();

  let result = await baseQuery(args, api, extraOptions);
  console.log('base query');
  console.log('cookie');
  console.log('result', { result });

  if (result.error) {
    if (result.error.status === 401) {
      console.log('result.error.status === 401');

      // checking whether the mutex is locked
      if (!mutex.isLocked()) {
        const release = await mutex.acquire();
        try {
          // try to get a new token
          const refreshResult = await baseQuery(
            {
              url: '/auth/refreshToken',
              method: 'POST',
              body: {
                refreshToken: getCookie(REFRESH_TOKEN) || ''
              }
            },
            api,
            extraOptions
          );
          const refreshData = refreshResult.data as any;

          if (refreshData?.data) {
            // store the new token
            api.dispatch(tokenReceived(refreshData.data as TRefreshToken));
            // retry the initial query
            result = await baseQuery(args, api, extraOptions);
          }
        } finally {
          // release must be called once the mutex should be released again.
          release();
        }
      } else {
        // wait until the mutex is available without locking it
        await mutex.waitForUnlock();
        result = await baseQuery(args, api, extraOptions);
      }
    }
    // else if (result.error.status === 403) {
    //   api.dispatch(logout());
    //   messageService.error(
    //     'Password is expired. Please go to forgot password page'
    //   );
    //   setTimeout(() => (window.location.href = '/auth/login'), 3000);
    // }
    // else {
    //   console.log(result.error)
    //   // api.dispatch(logout())
    //   messageService.error(
    //     'Connection to server refused. Please contact the system administrator'
    //   )
    // }
  } else {
  }

  return result;
};

export const api = createApi({
  /**
   * `reducerPath` is optional and will not be required by most users.
   * This is useful if you have multiple API definitions,
   * e.g. where each has a different domain, with no interaction between endpoints.
   * Otherwise, a single API definition should be used in order to support tag invalidation,
   * among other features
   */
  reducerPath: 'BASE_API',
  /**
   * A bare bones base query would just be `baseQuery: fetchBaseQuery({ baseUrl: '/' })`
   */
  keepUnusedDataFor: 0,
  baseQuery: baseQueryWithReAuth,
  /**
   * This api has endpoints injected in adjacent files,
   * which is why no endpoints are shown below.
   * If you want all endpoints defined in the same file, they could be included here instead
   */
  endpoints: () => ({})
});
