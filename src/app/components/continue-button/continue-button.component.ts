import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { login } from '../../state/auth/auth.actions';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Role } from '../../core/models/role.enum';

@Component({
  selector: 'app-continue-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './continue-button.component.html',
  styleUrls: ['./continue-button.component.scss'],
})
export class ContinueButtonComponent {
  constructor(private store: Store, private router: Router) {}

  onContinue(): void {
    this.store.dispatch(
      login({
        session: {
          user: { id: 1, name: 'Jan Kowalski', roles: [Role.ADMIN] },
          token: 'mocked-jwt-token',
        },
      })
    );
    this.router.navigate(['/app']);
  }
}
