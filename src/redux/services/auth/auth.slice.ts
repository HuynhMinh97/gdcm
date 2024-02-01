import { TAuthState } from '@/types/auth/login/TAuthState';
import { TRefreshToken } from '@/types/auth/login/TRefreshToken';
import { NAME, USER_NAME } from '@/utils/constant';
import { AppState } from '@/redux/store';
import {
  getCookieAuth,
  removeCookieAuth,
  setCookieAuth
} from '@/utils/manageCookie';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { endpoints as authApiEndpoints } from '@/redux/api/auth/auth.api';

const initialState: TAuthState = {
  user: null,
  accessToken: null,
  refreshToken: null
};

export const authSlice = createSlice({
  name: 'AUTHENTICATION',
  initialState,
  reducers: {
    logout: () => {
      removeCookieAuth();
      return initialState;
    },
    tokenReceived: (state, action: PayloadAction<TRefreshToken>) => {
      setCookieAuth(
        true,
        getCookieAuth(USER_NAME),
        getCookieAuth(NAME),
        action.payload?.accessToken!,
        action.payload?.refreshToken!
      );
      console.log('state', state);
      return {
        ...state,
        ...action.payload
      };
    }
  },
  extraReducers(builder) {
    builder.addMatcher(
      authApiEndpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.accessToken = payload.data?.accessToken;
        state.user = payload.data?.loginInfo;
        state.refreshToken = payload.data?.refreshToken;
        setCookieAuth(
          true,
          payload.data?.loginInfo?.userName,
          payload.data?.loginInfo?.name,
          payload.data?.accessToken,
          payload.data?.refreshToken
        );
      }
    );
  }
});

export const { tokenReceived, logout } = authSlice.actions;

export const selectAuthState = (state: AppState) => state.AUTHENTICATION;
