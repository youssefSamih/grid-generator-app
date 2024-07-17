import { AuthState } from './auth/auth.reducer';
import { GridState } from './grid/grid.reducer';
import { PaymentsState } from './payments/payments.reducer';

export interface AppState {
  auth: AuthState;
  grid: GridState;
  payments: PaymentsState;
}
