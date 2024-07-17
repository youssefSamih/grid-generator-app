import { createAction, props } from '@ngrx/store';

export const loadPayments = createAction('[Payments] Load Payments');
export const loadPaymentsSuccess = createAction(
  '[Payments] Load Payments Success',
  props<{ payments: any[] }>()
);
export const loadPaymentsFailure = createAction(
  '[Payments] Load Payments Failure',
  props<{ error: any }>()
);

export const addPayment = createAction(
  '[Payments] Add Payment',
  props<{ name: string; amount: number }>()
);
export const addPaymentSuccess = createAction(
  '[Payments] Add Payment Success',
  props<{ payment: any }>()
);
export const addPaymentFailure = createAction(
  '[Payments] Add Payment Failure',
  props<{ error: any }>()
);

export const paymentAdded = createAction(
  '[Payments] Payment Added',
  props<{ payment: any }>()
);
