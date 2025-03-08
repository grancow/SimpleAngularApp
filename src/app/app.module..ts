import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ContinueButtonComponent } from './shared/components/continue-button/continue-button.component';
import { sessionReducer } from './store/session.reducer';
import { StoreModule } from '@ngrx/store';
import { routes } from './app.routes';
import { AppLayoutComponent } from './features/layout/app-layout/app-layout.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { SessionEffects } from './store/session.effects';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    ContinueButtonComponent,
    AppLayoutComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    EffectsModule.forRoot([SessionEffects]),
    RouterModule.forRoot(routes),
    StoreModule.forRoot({ session: sessionReducer }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
