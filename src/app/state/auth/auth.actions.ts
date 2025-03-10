import { createAction, props } from '@ngrx/store';
import { UserSession } from './auth.state';

export const initializeApp = createAction('[Auth] Initialize App');

export const login = createAction(
  '[Auth] Login',
  props<{ session: UserSession }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ session: UserSession }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

export const logout = createAction('[Auth] Logout');

export const logoutSuccess = createAction('[Auth] Logout Success');

export const logoutFailure = createAction(
  '[Auth] Logout Failure',
  props<{ error: string }>()
);

export const refreshToken = createAction(
  '[Auth] Refresh Token',
  props<{ currentToken: string }>()
);

export const refreshTokenSuccess = createAction(
  '[Auth] Refresh Token Success',
  props<{ session: UserSession }>()
);

export const refreshTokenFailure = createAction(
  '[Auth] Refresh Token Failure',
  props<{ error: string }>()
);
