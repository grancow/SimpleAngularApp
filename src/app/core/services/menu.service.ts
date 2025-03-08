import { Injectable } from '@angular/core';
import { Role } from '../enums/roles.enum';
import { Observable, map, switchMap } from 'rxjs';
import { AuthService } from './auth.service';

interface MenuItem {
  label: string;
  path?: string;
  roles: Role[];
  children?: MenuItem[];
}

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private menu: MenuItem[] = [
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

  constructor(private authService: AuthService) {}

  getMenuForRole(): Observable<MenuItem[]> {
    return this.authService.getUserRoles().pipe(
      map(userRoles => {
        const filteredMenu = this.menu
          .filter((item) => item.roles.some((role) => userRoles.includes(role)))
          .map((item) => ({
            ...item,
            children:
              item.children?.filter((child) =>
                child.roles.some((role) => userRoles.includes(role))
              ) || [],
          }));

        console.log('✅ Wygenerowane menu dla użytkownika:', filteredMenu);
        return filteredMenu;
      })
    );
  }
}
