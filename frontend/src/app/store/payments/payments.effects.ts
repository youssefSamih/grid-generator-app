import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { PaymentsService } from '../../services/payments.service';
import * as PaymentsActions from './payments.actions';

@Injectable()
export class PaymentsEffects {
  constructor(
    private actions$: Actions,
    private paymentsService: PaymentsService
  ) {}

  loadPayments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PaymentsActions.loadPayments),
      mergeMap(() =>
        this.paymentsService.getPayments().pipe(
          map((payments) => PaymentsActions.loadPaymentsSuccess({ payments })),
          catchError((error) =>
            of(PaymentsActions.loadPaymentsFailure({ error }))
          )
        )
      )
    )
  );

  addPayment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PaymentsActions.addPayment),
      mergeMap(({ name, amount }) =>
        this.paymentsService.addPayment(name, amount).pipe(
          map((payment) => PaymentsActions.addPaymentSuccess({ payment })),
          catchError((error) =>
            of(PaymentsActions.addPaymentFailure({ error }))
          )
        )
      )
    )
  );

  paymentAdded$ = createEffect(() =>
    this.paymentsService
      .paymentAdded()
      .pipe(map((payment) => PaymentsActions.paymentAdded({ payment })))
  );
}
