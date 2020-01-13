import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const CountriesQuery = gql`
	query {
		countries {
			name
		}
	}
`;

@Component({
	selector: 'section-a',
	templateUrl: './section-a.component.html',
	styleUrls: ['./section-a.component.scss'],
	providers: [Apollo],
})
export class SectionAComponent implements OnInit {
	public countries$: Observable<any>;

	public constructor(private apollo: Apollo) {}

	public ngOnInit(): void {
		this.countries$ = this.apollo.query({ query: CountriesQuery }).pipe(map((res: any) => res.data.countries));
	}
}
