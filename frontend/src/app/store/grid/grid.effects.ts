import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';

import { GridService } from '../../services/grid.service';
import * as GridActions from './grid.actions';

@Injectable()
export class GridEffects {
  constructor(private actions$: Actions, private gridService: GridService) {}

  refreshGrid$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GridActions.refreshGrid),
      mergeMap(() =>
        this.gridService.getGrid().pipe(
          map(({ cells, code }) =>
            GridActions.refreshGridSuccess({ cells, code })
          ),
          catchError((error) => of(GridActions.refreshGridFailure({ error })))
        )
      )
    )
  );

  startGenerator$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GridActions.startGenerator),
      switchMap(() => this.gridService.generateGrid())
    )
  );

  setBias$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GridActions.setBias),
      switchMap(({ bias }) => this.gridService.generateGrid(bias))
    )
  );

  gridUpdated$ = createEffect(() =>
    this.gridService
      .gridUpdated()
      .pipe(map(({ cells, code }) => GridActions.gridUpdated({ cells, code })))
  );
}
