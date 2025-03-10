import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUser } from '../state/auth/auth.selectors';
import { map, take } from 'rxjs/operators';
import { Role } from '../core/models/role.enum';

export const RoleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const store = inject(Store);
  const router = inject(Router);

  if (route.routeConfig?.path === 'no-access') {
    return true;
  }

  return store.select(selectUser).pipe(
    take(1),
    map((user) => {
      if (!user || !user.roles || user.roles.length === 0) {
        return true;
      }

      const requiredRoles = route.data?.['roles'] as Role[];

      if (!requiredRoles || requiredRoles.length === 0) {
        return true;
      }

      const hasAccess = requiredRoles.some((role) => user.roles.includes(role));

      if (!hasAccess) {
        router.navigateByUrl('/app/no-access');
      }
      return hasAccess;
    })
  );
};
