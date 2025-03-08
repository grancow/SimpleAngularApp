import { createSelector, createFeatureSelector } from '@ngrx/store';
import { SessionState } from './session.reducer';

export const selectSessionState = createFeatureSelector<SessionState>('session');
export const selectUser = createSelector(selectSessionState, (state) => state.user);
