import { Component, OnInit, ViewChild } from '@angular/core'
import { Cocktail } from '../../../domain/cocktail'
import { CocktailService } from '../../../services/cocktail/cocktail.service'
import { Status } from '../../../domain/common'
import { Table } from 'primeng/table'
import { FilterService } from '../../../services/filter/filter.service'

@Component({
  selector: 'app-cocktails-management',
  templateUrl: './cocktails-management.component.html',
  styleUrls: ['./cocktails-management.component.css']
})
export class CocktailsManagementComponent implements OnInit {
  @ViewChild('table') table!: Table

  cocktails: Array<Cocktail> = []
  loading: boolean = true
  totalRecords: number = 0
  first: number = 0

  constructor(private cocktailService: CocktailService,
              private filterService: FilterService) {
  }

  ngOnInit(): void {
    this.loading = true
    const filter = this.filterService.createFilter(this.first, 10, null, 1, {})
    this.cocktailService.getCocktailsByFilter(filter).subscribe({
      next: response => {
        this.cocktails = response.content
        this.totalRecords = response.totalElements
        this.loading = false
      }
    })
  }

  loadData(first: number) {
    this.loading = true
    this.first = first
    const filter = this.filterService.createFilter(first, 10, null, 1, {})
    this.cocktailService.getCocktailsByFilter(filter).subscribe({
      next: response => {
        this.cocktails = response.content
        this.totalRecords = response.totalElements
        this.loading = false
      }
    })
  }

  getStatusValue(status: Status) {
    if (status == Status.DECLINED) return 'Отклонен'
    if (status == Status.PENDING) return 'На рассмотрении'
    return 'Одобрен'
  }
}
