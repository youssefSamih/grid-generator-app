import { createReducer, on } from '@ngrx/store';
import * as PaymentsActions from './payments.actions';

export interface PaymentsState {
  payments: any[];
  error: string | null;
  loading: boolean;
}

export const initialState: PaymentsState = {
  payments: [],
  error: null,
  loading: false,
};

export const paymentsReducer = createReducer(
  initialState,
  on(PaymentsActions.loadPayments, (state) => ({ ...state, loading: true })),
  on(PaymentsActions.loadPaymentsSuccess, (state, { payments }) => ({
    ...state,
    payments,
    loading: false,
    error: null,
  })),
  on(PaymentsActions.loadPaymentsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(PaymentsActions.addPaymentSuccess, (state, { payment }) => ({
    ...state,
    payments: [...state.payments, payment],
  })),
  on(PaymentsActions.paymentAdded, (state, { payment }) => ({
    ...state,
    payments: [...state.payments, payment],
  }))
);
