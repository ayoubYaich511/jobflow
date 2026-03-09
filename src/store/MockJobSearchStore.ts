// Mock job search store
export class MockJobSearchStore {
	private searchQuery: string = "";
	private searchFilters: any = {};
	private searchResults: any[] = [];

	getSearchQuery(): string {
		return this.searchQuery;
	}

	setSearchQuery(query: string): void {
		this.searchQuery = query;
		console.log("Mock JobSearchStore: setSearchQuery called with", query);
	}

	getSearchFilters(): any {
		return this.searchFilters;
	}

	setSearchFilters(filters: any): void {
		this.searchFilters = filters;
		console.log("Mock JobSearchStore: setSearchFilters called with", filters);
	}

	getSearchResults(): any[] {
		return this.searchResults;
	}

	setSearchResults(results: any[]): void {
		this.searchResults = results;
		console.log(
			"Mock JobSearchStore: setSearchResults called with",
			results.length,
			"results",
		);
	}

	clearSearch(): void {
		this.searchQuery = "";
		this.searchFilters = {};
		this.searchResults = [];
		console.log("Mock JobSearchStore: clearSearch called");
	}
}

