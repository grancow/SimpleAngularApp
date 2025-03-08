import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PasswordComponent } from './password/password.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'password', component: PasswordComponent },
  { path: 'preferences', component: PreferencesComponent }
];

@NgModule({
  declarations: [
    PasswordComponent,
    PreferencesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class SettingsModule { }
