import { TLoginResponse } from '@/types/auth/login/TUser';
import { api } from '../base.api';
import { TLoginRequest } from '@/types/auth/login/TLoginRequest';

interface UserResponse {
  success: boolean;
  status: number;
  data: {
    loginInfo: TLoginResponse;
    accessToken: string;
    refreshToken: string;
    expiredIn: number;
    customLogMaxDayRange: string;
    generateReportMaxDayRange: string;
  };
  message: string | null;
}

export const authApi = api.injectEndpoints({
  endpoints(builder) {
    return {
      login: builder.mutation<UserResponse, TLoginRequest>({
        query: dta => {
          return {
            url: `auth/login`,
            method: 'POST',
            body: dta
          };
        }
      }),
      logout: builder.mutation<void, void>({
        query() {
          return {
            url: `auth/logout`,
            method: 'POST'
          };
        }
      })
    };
  }
});

export const { useLoginMutation, useLogoutMutation, endpoints } = authApi;
