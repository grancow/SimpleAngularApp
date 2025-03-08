import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadSession } from './store/session.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-app';

  constructor(private store: Store) {}

  ngOnInit() {
    const savedSession = localStorage.getItem('session');
    if (savedSession) {
      const { user, token } = JSON.parse(savedSession);
      this.store.dispatch(loadSession({ user, token }));
      console.log('Sesja załadowana z localStorage: ', user)
    }
  }

}
