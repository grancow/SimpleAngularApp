import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUser } from '../../store/session.selectors';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.store.select(selectUser).pipe(
      map((user) => {
        if (!user || user === null) {
          // 🔥 Użytkownik musi być zalogowany!
          console.log('❌ Użytkownik niezalogowany - przekierowanie na /');
          this.router.navigate(['/']);
          return false;
        }
        console.log('✅ Użytkownik zalogowany:', user);
        return true;
      })
    );
  }
}
