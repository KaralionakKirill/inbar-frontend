import { Component, ViewChild } from '@angular/core'
import { Table } from 'primeng/table'
import { Status } from '../../../domain/common'
import { IngredientService } from '../../../services/ingredient/ingredient.service'
import { Ingredient } from '../../../domain/ingredient'
import { FilterService } from '../../../services/filter/filter.service'

@Component({
  selector: 'app-ingredients-management',
  templateUrl: './ingredients-management.component.html',
  styleUrls: ['./ingredients-management.component.css']
})
export class IngredientsManagementComponent {
  @ViewChild('table') table!: Table

  ingredients: Array<Ingredient> = []
  loading: boolean = true
  totalRecords: number = 0
  first: number = 0

  constructor(private ingredientService: IngredientService,
              private filterService: FilterService) {
  }

  ngOnInit(): void {
    this.loading = true
    const filter = this.filterService.createFilter(this.first, 10, null, 1, {})
    this.ingredientService.getIngredientsByFilter(filter).subscribe({
      next: response => {
        this.ingredients = response.content
        this.totalRecords = response.totalElements
        this.loading = false
      }
    })
  }

  loadData(first: number) {
    this.loading = true
    this.first = first
    const filter = this.filterService.createFilter(this.first, 10, null, 1, {})
    this.ingredientService.getIngredientsByFilter(filter).subscribe({
      next: response => {
        this.ingredients = response.content
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
