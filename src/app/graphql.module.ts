import { NgModule } from '@angular/core';

import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';

import { environment } from '../environments/environment';

const uri = environment.api;

const errorLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors) {
		graphQLErrors.map(({ message, locations, path }) =>
			// tslint:disable-next-line: no-console
			console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
		);
	}

	if (networkError) {
		// tslint:disable-next-line: no-console
		console.log(`[Network error]: ${networkError}`);
	}
});

@NgModule({
	exports: [ApolloModule, HttpLinkModule],
	providers: [
		{
			provide: APOLLO_OPTIONS,
			useFactory: (httpLink: HttpLink) => {
				const link = httpLink.create({ uri });

				return {
					cache: new InMemoryCache(),
					link: errorLink.concat(link),
					defaultOptions: {
						watchQuery: {
							errorPolicy: 'all',
						},
					},
				};
			},
			deps: [HttpLink],
		},
	],
})
export class GraphQLModule {}
