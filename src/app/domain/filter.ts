export interface Filter {
  first: number

  rows: number

  sortField: string | null

  sortOrder: number

  filters: { [s: string]: FilterMetadata[] }
}

export interface FilterMetadata {
  value: Array<string>

  matchMode: MatchMode

  operator: FilterOperator
}

export enum MatchMode {
  GT = 'greaterThan',
  LT = 'lessThan',
  EQ = 'equals',
  DATE_GT = 'dateAfter',
  DATE_LT = 'dateBefore',
  CONTAINS = 'contains',
  STARTS_WITH = 'startsWith',
  IN = 'in'
}

export enum FilterOperator {
  AND = 'and',
  OR = 'or'
}