import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private apollo: Apollo) {}

  login(email: string, password: string): Observable<any> {
    return this.apollo
      .mutate({
        mutation: gql`
          mutation Login($email: String!, $password: String!) {
            login(email: $email, password: $password) {
              token
              user {
                id
                username
                email
              }
            }
          }
        `,
        variables: { email, password },
      })
      .pipe(map((result: any) => result.data.login));
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.apollo
      .mutate({
        mutation: gql`
          mutation Register(
            $username: String!
            $email: String!
            $password: String!
          ) {
            register(username: $username, email: $email, password: $password) {
              token
              user {
                id
                username
                email
              }
            }
          }
        `,
        variables: { username, email, password },
      })
      .pipe(map((result: any) => result.data.register));
  }
}
