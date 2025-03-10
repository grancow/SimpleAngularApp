import { createReducer, on } from '@ngrx/store';
import { AuthState } from './auth.state';
import * as AuthActions from './auth.actions';
import { initialState } from './auth.state';

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, { session }) => ({
    ...state,
    session,
    error: null,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(AuthActions.logoutSuccess, (state) => ({
    ...state,
    session: null,
    error: null,
  })),
  on(AuthActions.logoutFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(AuthActions.refreshTokenSuccess, (state, { session }) => ({
    ...state,
    session,
    error: null,
  })),
  on(AuthActions.refreshTokenFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
