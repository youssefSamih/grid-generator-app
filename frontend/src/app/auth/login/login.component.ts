import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as AuthActions from '../../store/auth/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  error$: Observable<string> | undefined;
  loading$: Observable<boolean> | undefined;
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
    this.error$ = this.store.select((state: any) => state.auth.error);
    this.loading$ = this.store.select((state: any) => state.auth.loading);
    this.store
      .select((state: any) => state.auth.token)
      .subscribe((token) => {
        if (!token) return;

        this.router.navigate(['/generator']);
      });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.store.dispatch(AuthActions.login({ email, password }));
    }
  }
}
