import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

export const selectAuth = createFeatureSelector<AuthState>('auth');

export const selectSession = createSelector(
  selectAuth,
  (state: AuthState) => state.session
);

export const selectUser = createSelector(
  selectSession,
  (session) => session?.user
);

export const selectToken = createSelector(
  selectSession,
  (session) => session?.token
);

export const selectIsAuthenticated = createSelector(
  selectSession,
  (session) => !!session
);

export const selectUserRoles = createSelector(
  selectSession,
  (session) => session?.user.roles || []
);

export const selectAuthError = createSelector(
  selectAuth,
  (state: AuthState) => state.error
);
