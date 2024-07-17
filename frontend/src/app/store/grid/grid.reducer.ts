import { createReducer, on } from '@ngrx/store';

import * as GridActions from './grid.actions';

export interface GridState {
  cells: string[][];
  code: string;
  error: string | null;
  loading: boolean;
}

export const initialState: GridState = {
  cells: [],
  code: '',
  error: null,
  loading: false,
};

export const gridReducer = createReducer(
  initialState,
  on(GridActions.refreshGrid, (state) => ({ ...state, loading: true })),
  on(GridActions.refreshGridSuccess, (state, { cells, code }) => ({
    ...state,
    cells,
    code,
    loading: false,
    error: null,
  })),
  on(GridActions.refreshGridFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(GridActions.gridUpdated, (state, { cells, code }) => ({
    ...state,
    cells,
    code,
  }))
);
