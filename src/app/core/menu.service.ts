import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUser } from '../state/auth/auth.selectors';
import { Observable, map } from 'rxjs';
import { Role } from './models/role.enum';

export interface MenuItem {
  label: string;
  path?: string;
  roles: Role[];
  children?: MenuItem[];
}

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private store = inject(Store);

  private menuItems: MenuItem[] = [
    { label: 'Dashboard', path: '/app/dashboard', roles: [Role.USER, Role.ADMIN] },
    {
      label: 'Ustawienia',
      roles: [Role.ADMIN],
      children: [
        {
          label: 'Zmiana hasła',
          path: '/app/settings/password',
          roles: [Role.ADMIN],
        },
        {
          label: 'Preferencje',
          path: '/app/settings/preferences',
          roles: [Role.ADMIN],
        },
      ],
    },
    { label: 'Profil', path: '/app/profile', roles: [Role.USER, Role.ADMIN] },
  ];

  constructor() {}

  getMenuForRole(): Observable<MenuItem[]> {
    return this.store.select(selectUser).pipe(
      map((user) => {
        if (!user || !user.roles || user.roles.length === 0) {
          return [];
        }

        // Filtrowanie menu na podstawie ról użytkownika
        const filteredMenu = this.menuItems
          .map((item) => {
            if (item.children) {
              const filteredChildren = item.children.filter((child) =>
                child.roles.some((role) => user.roles.includes(role))
              );
              return filteredChildren.length
                ? { ...item, children: filteredChildren }
                : null;
            }
            return item.roles.some((role) => user.roles.includes(role))
              ? item
              : null;
          })
          .filter((item) => item !== null) as MenuItem[];

        return filteredMenu;
      })
    );
  }
}
