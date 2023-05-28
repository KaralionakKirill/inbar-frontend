import { Injectable } from '@angular/core'
import { Filter, FilterMetadata, FilterOperator, MatchMode } from '../../domain/filter'

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor() {
  }

  createFilterMetadata(value: Array<string>, matchMode: MatchMode, operator: FilterOperator) {
    return {
      value,
      matchMode,
      operator
    } as FilterMetadata
  }

  createFilter(first: number,
               rows: number,
               sortField: string | null,
               sortOrder: number,
               filters: { [s: string]: FilterMetadata[] }) {
    return {
      first,
      rows,
      sortField,
      sortOrder,
      filters
    } as Filter
  }
}
