import { Store } from '@ngrx/store';
import { startWith, switchMap, tap } from 'rxjs/operators';
import { Observable, interval, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

import * as GridActions from '../store/grid/grid.actions';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.scss'],
})
export class GeneratorComponent implements OnInit, OnDestroy {
  grid$: Observable<string[][]> | undefined;
  code$: Observable<string> | undefined;
  private refreshSubscription: Subscription | undefined;

  constructor(private store: Store) {}

  ngOnInit() {
    this.grid$ = this.store.select((state: any) => state.grid.cells);
    this.code$ = this.store.select((state: any) => state.grid.code);

    this.refreshSubscription = interval(2000)
      .pipe(
        startWith(0),
        tap(() => this.store.dispatch(GridActions.refreshGrid()))
      )
      .subscribe();
  }

  ngOnDestroy() {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  startGenerator() {
    this.store.dispatch(GridActions.startGenerator());
  }

  setBias(bias: string) {
    this.store.dispatch(GridActions.setBias({ bias }));
  }
}
