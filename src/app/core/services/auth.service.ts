import { Injectable } from '@angular/core';
import { Role } from '../enums/roles.enum';
import { Store } from '@ngrx/store';
import { selectUser } from '../../store/session.selectors';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private store: Store) {}

  hasRole(requiredRole: Role): Observable<boolean> {
    return this.store.select(selectUser).pipe(
      map(user => {
        if (!user || !user.roles) return false;
        return user.roles.includes(requiredRole);
      })
    );
  }

  hasAnyRole(requiredRoles: Role[]): Observable<boolean> {
    return this.store.select(selectUser).pipe(
      map(user => {
        if (!user || !user.roles) return false;
        return user.roles.some(role => requiredRoles.includes(role));
      })
    );
  }

  hasAllRoles(requiredRoles: Role[]): Observable<boolean> {
    return this.store.select(selectUser).pipe(
      map(user => {
        if (!user || !user.roles) return false;
        return requiredRoles.every(role => user.roles.includes(role));
      })
    );
  }

  getUserRoles(): Observable<Role[]> {
    return this.store.select(selectUser).pipe(
      map(user => user?.roles || [])
    );
  }
} 