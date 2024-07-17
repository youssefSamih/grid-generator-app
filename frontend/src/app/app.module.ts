import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { BrowserModule } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { AppRoutingModule } from './app-routing.module';
import { authReducer } from './store/auth/auth.reducer';
import { gridReducer } from './store/grid/grid.reducer';
import { AuthEffects } from './store/auth/auth.effects';
import { GridEffects } from './store/grid/grid.effects';
import { JwtInterceptor } from './auth/jwt.interceptor';
import { LoginComponent } from './auth/login/login.component';
import { PaymentsComponent } from './payments/payments.component';
import { paymentsReducer } from './store/payments/payments.reducer';
import { PaymentsEffects } from './store/payments/payments.effects';
import { GeneratorComponent } from './generator/generator.component';
import { RegisterComponent } from './auth/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    GeneratorComponent,
    PaymentsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    GraphQLModule,
    StoreModule.forRoot({
      auth: authReducer,
      grid: gridReducer,
      payments: paymentsReducer,
    }),
    EffectsModule.forRoot([AuthEffects, GridEffects, PaymentsEffects]),
    StoreDevtoolsModule.instrument(),
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatListModule,
    MatCardModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
