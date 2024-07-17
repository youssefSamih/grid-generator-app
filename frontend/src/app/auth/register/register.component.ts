import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as AuthActions from '../../store/auth/auth.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  error$: Observable<string> | undefined;
  loading$: Observable<boolean> | undefined;
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
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
    if (this.registerForm.valid) {
      const { username, email, password } = this.registerForm.value;
      this.store.dispatch(AuthActions.register({ username, email, password }));
    }
  }
}
