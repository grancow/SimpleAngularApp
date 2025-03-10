import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { UserSession } from '../state/auth/auth.state';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_REFRESH_INTERVAL = 1000 * 60 * 15; // 15 minut

  refreshToken(currentToken: string): Observable<UserSession> {
    return of(currentToken).pipe(
      delay(1000),
      map((token) => {
        const currentSession = this.getCurrentSession();
        if (!currentSession) {
          throw new Error('Brak aktywnej sesji');
        }

        return {
          ...currentSession,
          token: `${token}-refreshed-${new Date().getTime()}`,
        };
      })
    );
  }

  private getCurrentSession(): UserSession | null {
    const savedSession = localStorage.getItem('userSession');
    return savedSession ? JSON.parse(savedSession) : null;
  }

  isTokenExpired(token: string): boolean {
    const tokenParts = token.split('-');
    if (tokenParts.length > 2) {
      const timestamp = parseInt(tokenParts[tokenParts.length - 1], 10);
      return Date.now() - timestamp > this.TOKEN_REFRESH_INTERVAL;
    }
    return true;
  }
}
