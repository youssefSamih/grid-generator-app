import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.store
      .select((state: any) => state.auth.token)
      .pipe(
        take(1),
        map((token) => {
          if (token) {
            return true;
          } else {
            this.router.navigate(['/login']);

            return false;
          }
        })
      );
  }
}
