import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class PaymentsService {
  constructor(private apollo: Apollo) {}

  getPayments(): Observable<any> {
    return this.apollo
      .query({
        query: gql`
          query GetPayments {
            getPayments {
              id
              name
              amount
              code
              grid
              createdAt
            }
          }
        `,
      })
      .pipe(map((result: any) => result.data.getPayments));
  }

  addPayment(name: string, amount: number): Observable<any> {
    return this.apollo
      .mutate({
        mutation: gql`
          mutation AddPayment($name: String!, $amount: Float!) {
            addPayment(name: $name, amount: $amount) {
              id
              name
              amount
              code
              grid
              createdAt
            }
          }
        `,
        variables: { name, amount },
      })
      .pipe(map((result: any) => result.data.addPayment));
  }

  paymentAdded(): Observable<any> {
    return this.apollo
      .subscribe({
        query: gql`
          subscription PaymentAdded {
            paymentAdded {
              id
              name
              amount
              code
              grid
              createdAt
            }
          }
        `,
      })
      .pipe(map((result: any) => result.data.paymentAdded));
  }
}
