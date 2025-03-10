import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectToken } from '../state/auth/auth.selectors';
import { map, take } from 'rxjs/operators';

export const AuthGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectToken).pipe(
    take(1),
    map(token => {
      if (token) {
        return true;
      } else {
        router.navigate(['/']);
        return false;
      }
    })
  );
};
