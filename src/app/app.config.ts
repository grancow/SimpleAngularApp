import { ApplicationConfig, isDevMode, APP_BOOTSTRAP_LISTENER } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { authReducer } from './state/auth/auth.reducer';
import { AuthEffects } from './state/auth/auth.effects';
import { initializeApp } from './state/auth/auth.actions';
import { Store } from '@ngrx/store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideStore({ auth: authReducer }),
    provideEffects([AuthEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    {
      provide: APP_BOOTSTRAP_LISTENER,
      useFactory: (store: Store) => {
        return () => {
          store.dispatch(initializeApp());
        };
      },
      deps: [Store],
      multi: true
    }
  ],
};
