import { createAction, props } from '@ngrx/store';

export const refreshGrid = createAction('[Grid] Refresh Grid');
export const refreshGridSuccess = createAction(
  '[Grid] Refresh Grid Success',
  props<{ cells: string[][]; code: string }>()
);
export const refreshGridFailure = createAction(
  '[Grid] Refresh Grid Failure',
  props<{ error: any }>()
);

export const startGenerator = createAction('[Grid] Start Generator');
export const setBias = createAction(
  '[Grid] Set Bias',
  props<{ bias: string }>()
);

export const gridUpdated = createAction(
  '[Grid] Grid Updated',
  props<{ cells: string[][]; code: string }>()
);
