import { createReducer, on } from '@ngrx/store';
import { endSession, loadSession, startSession } from './session.actions';
import { Role } from '../core/enums/roles.enum';

export interface SessionState {
  user: { name: string; roles: Role[] } | null;
  token: string | null;
}

const savedSession = localStorage.getItem('session');
const initialState: SessionState = savedSession ? JSON.parse(savedSession) : { user: null, token: null };

export const sessionReducer = createReducer(
  initialState,
  on(startSession, (state, action) => ({ ...state, user: action.user, token: action.token })),
  on(loadSession, (state, action) => ({ ...state, user: action.user, token: action.token })),
  on(endSession, () => ({ user: null, token: null }))
);
