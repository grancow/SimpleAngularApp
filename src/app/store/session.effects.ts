import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { startSession, endSession } from './session.actions';
import { tap } from 'rxjs/operators';

@Injectable()
export class SessionEffects {
  constructor(private actions$: Actions) {}

  // Zapisuje sesję do localStorage po zalogowaniu
  saveSession$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(startSession),
        tap(action => {
          const sessionData = JSON.stringify({ user: action.user, token: action.token });
          localStorage.setItem('session', sessionData);
          console.log('Sesja zapisana w localStorage: ', sessionData);
        })
      ),
    { dispatch: false }
  );

  // Usuwa sesję z localStorage po wylogowaniu
  clearSession$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(endSession),
        tap(() => {
          localStorage.removeItem('session');
          console.log('Sesja usunięta z localStorage');
        })
      ),
    { dispatch: false }
  );

  refreshToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(startSession),
      tap(() => {
        setInterval(() => {
          console.log('🔄 Token odświeżony!');
        }, 300000);  // Co 5 minut
      })
    ),
    { dispatch: false }
  );
}
