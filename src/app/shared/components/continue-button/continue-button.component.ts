import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { startSession } from '../../../store/session.actions';
import { Role } from '../../../core/enums/roles.enum';

@Component({
  selector: 'app-continue-button',
  templateUrl: './continue-button.component.html',
  styleUrls: ['./continue-button.component.scss']
})
export class ContinueButtonComponent {
  constructor(private store: Store, private router: Router) {}

  onContinue() {
    console.log("Kliknięty przycisk")
    const mockUser = {
      user: { name: 'Jan Kowalski', roles: [Role.ADMIN] },
      token: 'mocked-tokenJWT'
    };

    // Zapisujemy sesję w store
    this.store.dispatch(startSession(mockUser));

    // Przekierowanie na /app
    this.router.navigate(['/app']).then(success => {
      if (success) {
        console.log('✅ Przekierowanie do /app zakończone sukcesem');
      } else {
        console.error('❌ Błąd przekierowania do /app!');
      }
    })
  }
}
