import { Routes } from '@angular/router';
import { ContinueButtonComponent } from './shared/components/continue-button/continue-button.component';
import { AppLayoutComponent } from './features/layout/app-layout/app-layout.component';
import { AuthGuard } from './core/guards/auth.guard';
import { NoAccessComponent } from './features/no-access/no-access.component';
import { RoleGuard } from './core/guards/role.guard';
import { Role } from './core/enums/roles.enum';

export const routes: Routes = [
  { path: '', component: ContinueButtonComponent },
  {
    path: 'app',
    component: AppLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./features/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./features/settings/settings.module').then(
            (m) => m.SettingsModule
          ),
        canActivate: [RoleGuard],
        data: { roles: [Role.ADMIN] },
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./features/profile/profile.module').then(
            (m) => m.ProfileModule
          ),
        canActivate: [RoleGuard],
        data: { roles: [Role.USER, Role.ADMIN] },
      },
      { path: 'no-access', component: NoAccessComponent },
    ],
  },
];
