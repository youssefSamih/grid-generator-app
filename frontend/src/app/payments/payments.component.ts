import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as PaymentsActions from '../store/payments/payments.actions';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
})
export class PaymentsComponent implements OnInit {
  payments$: Observable<any[]> | undefined;
  code$: Observable<string> | undefined;
  paymentForm: FormGroup;

  constructor(private store: Store, private fb: FormBuilder) {
    this.paymentForm = this.fb.group({
      name: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit() {
    this.payments$ = this.store.select((state: any) => state.payments.payments);
    this.code$ = this.store.select((state: any) => state.grid.code);
    this.store.dispatch(PaymentsActions.loadPayments());
  }

  onSubmit() {
    if (this.paymentForm.valid) {
      const { name, amount } = this.paymentForm.value;
      this.store.dispatch(PaymentsActions.addPayment({ name, amount }));
      this.paymentForm.reset();
    }
  }
}
