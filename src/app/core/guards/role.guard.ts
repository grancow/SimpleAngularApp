import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Role } from '../enums/roles.enum';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const requiredRoles = route.data['roles'] as Role[];
    
    return this.authService.hasAnyRole(requiredRoles).pipe(
      tap(hasAccess => {
        if (!hasAccess) {
          console.log(`❌ Brak dostępu do ${route.url}`);
          this.router.navigate(['/app/no-access']);
        }
      })
    );
  }
}
