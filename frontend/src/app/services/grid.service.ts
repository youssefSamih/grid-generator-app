import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class GridService {
  constructor(private apollo: Apollo) {}

  getGrid(): Observable<any> {
    return this.apollo
      .query({
        query: gql`
          query GetGrid {
            getGrid {
              cells
              code
            }
          }
        `,
      })
      .pipe(map((result: any) => result.data.getGrid));
  }

  generateGrid(bias?: string): Observable<any> {
    return this.apollo
      .mutate({
        mutation: gql`
          mutation GenerateGrid($bias: String!) {
            generateGrid(bias: $bias) {
              cells
              code
            }
          }
        `,
        variables: { bias: bias || '' },
      })
      .pipe(map((result: any) => result.data.generateGrid));
  }

  gridUpdated(): Observable<any> {
    return this.apollo
      .subscribe({
        query: gql`
          subscription GridUpdated {
            gridUpdated {
              cells
              code
            }
          }
        `,
      })
      .pipe(map((result: any) => result.data.gridUpdated));
  }
}
