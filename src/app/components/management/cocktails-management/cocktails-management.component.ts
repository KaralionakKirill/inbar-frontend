import { Component, ViewChild } from '@angular/core'
import { Cocktail } from '../../../domain/cocktail'
import { LazyLoadEvent } from 'primeng/api'
import { CocktailService } from '../../../services/cocktail/cocktail.service'
import { Status } from '../../../domain/common'
import { Table } from 'primeng/table'

@Component({
  selector: 'app-cocktails-management',
  templateUrl: './cocktails-management.component.html',
  styleUrls: ['./cocktails-management.component.css']
})
export class CocktailsManagementComponent {
  @ViewChild('table') table!: Table

  cocktails: Array<Cocktail> = []
  loading: boolean = true
  totalRecords: number = 0

  constructor(private cocktailService: CocktailService) {
  }

  loadData(filter: LazyLoadEvent) {
    this.loading = true
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
