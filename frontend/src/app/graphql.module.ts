import { NgModule } from '@angular/core';
import { ApolloLink, split } from '@apollo/client/core';
import { InMemoryCache } from '@apollo/client/core';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { getMainDefinition } from '@apollo/client/utilities';
import { HttpLink } from 'apollo-angular/http';
import { createClient } from 'graphql-ws';

const uri = 'http://localhost:4000/graphql'; // HTTP URL
const wsUri = 'ws://localhost:4000/graphql'; // WebSocket URL

export function createApollo(httpLink: HttpLink) {
  const http = httpLink.create({
    uri,
    withCredentials: true,
  });

  const ws = new GraphQLWsLink(
    createClient({
      url: wsUri,
    })
  );

  const link = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    ws,
    http as unknown as ApolloLink
  );

  return {
    link,
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
