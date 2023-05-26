import { Component, ViewChild } from '@angular/core'
import { Table } from 'primeng/table'
import { LazyLoadEvent } from 'primeng/api'
import { Status } from '../../../domain/common'
import { IngredientService } from '../../../services/ingredient/ingredient.service'
import { Ingredient } from '../../../domain/ingredient'

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

  constructor(private ingredientService: IngredientService) {
  }

  loadData(filter: LazyLoadEvent) {
    this.loading = true
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
