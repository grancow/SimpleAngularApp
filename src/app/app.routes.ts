import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { Role } from './core/models/role.enum';

export const appRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/continue-button/continue-button.component').then(
        (m) => m.ContinueButtonComponent
      ),
  },
  {
    path: 'app',
    loadComponent: () =>
      import('./layouts/app-layout/app-layout.component').then(
        (m) => m.AppLayoutComponent
      ),
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/home/home.component').then(
            (m) => m.HomeComponent
          ),
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
        canActivate: [RoleGuard],
        data: { roles: [Role.ADMIN, Role.USER] },
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./pages/profile/profile.component').then(
            (m) => m.ProfileComponent
          ),
        canActivate: [RoleGuard],
        data: { roles: [Role.ADMIN, Role.USER] },
      },
      {
        path: 'settings/password',
        loadComponent: () =>
          import('./pages/settings/password/password.component').then(
            (m) => m.PasswordComponent
          ),
        canActivate: [RoleGuard],
        data: { roles: [Role.ADMIN] },
      },
      {
        path: 'settings/preferences',
        loadComponent: () =>
          import('./pages/settings/preferences/preferences.component').then(
            (m) => m.PreferencesComponent
          ),
        canActivate: [RoleGuard],
        data: { roles: [Role.ADMIN] },
      },
      {
        path: 'no-access',
        loadComponent: () =>
          import('./pages/no-access/no-access.component').then(
            (m) => m.NoAccessComponent
          ),
      },
      {
        path: '**',
        redirectTo: 'no-access'
      }
    ],
  },
  { path: '**', redirectTo: '' },
];
