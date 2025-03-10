import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, mergeMap, catchError, withLatestFrom } from 'rxjs/operators';
import * as AuthActions from './auth.actions';
import { selectSession } from './auth.selectors';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private store = inject(Store);

  initializeApp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.initializeApp),
      mergeMap(() => {
        const session = localStorage.getItem('session');
        if (session) {
          const parsedSession = JSON.parse(session);
          if (!parsedSession.user.roles || parsedSession.user.roles.length === 0) {
            localStorage.removeItem('session');
            return of(AuthActions.loginFailure({ error: 'User has no roles' }));
          }
          return of(parsedSession).pipe(
            map((session) => AuthActions.loginSuccess({ session })),
            catchError((error) =>
              of(AuthActions.loginFailure({ error: error.message }))
            )
          );
        }
        return of(AuthActions.loginFailure({ error: 'No session found' }));
      })
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ session }) => {
        if (!session.user.roles || session.user.roles.length === 0) {
          return of(AuthActions.loginFailure({ error: 'User has no roles' }));
        }
        localStorage.setItem('session', JSON.stringify(session));
        return of(session).pipe(
          map((session) => AuthActions.loginSuccess({ session })),
          catchError((error) =>
            of(AuthActions.loginFailure({ error: error.message }))
          )
        );
      })
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      mergeMap(() => {
        localStorage.removeItem('session');
        return of(null).pipe(
          map(() => AuthActions.logoutSuccess()),
          catchError((error) =>
            of(AuthActions.logoutFailure({ error: error.message }))
          )
        );
      })
    )
  );

  refreshToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.refreshToken),
      withLatestFrom(this.store.select(selectSession)),
      mergeMap(([{ currentToken }, session]) => {
        if (!session) {
          return of(AuthActions.refreshTokenFailure({ error: 'No active session' }));
        }
        if (!session.user.roles || session.user.roles.length === 0) {
          return of(AuthActions.refreshTokenFailure({ error: 'User has no roles' }));
        }
        return of({ currentToken, session }).pipe(
          map(({ session }) => AuthActions.refreshTokenSuccess({ session })),
          catchError((error) =>
            of(AuthActions.refreshTokenFailure({ error: error.message }))
          )
        );
      })
    )
  );
}
