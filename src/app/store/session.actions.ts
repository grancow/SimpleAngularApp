import { createAction, props } from '@ngrx/store';
import { Role } from '../core/enums/roles.enum';

export const startSession = createAction(
  '[Session] Start Session',
  props<{ user: { name: string; roles: Role[] }, token: string }>()
);

export const endSession = createAction('[Session] End Session');

export const loadSession = createAction(
  '[Session] Load Session',
  props<{ user: { name: string; roles: Role[] }, token: string }>()
);
