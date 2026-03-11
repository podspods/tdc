// Common query parameters
export interface PaginationQuery {
  page?: string;
  limit?: string;
}

export interface SearchQuery {
  q: string;
}

export interface CountryQuery {
  country: string;
}

export interface IdParams {
  id: string;
}
