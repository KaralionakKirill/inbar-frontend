import { Injectable } from '@angular/core'
import {
  CreateIngredientRequest,
  CreateIngredientResponse,
  Ingredient,
  IngredientInfo,
  UpdateIngredientRequest,
  UpdateIngredientResponse
} from '../../domain/ingredient'
import { HttpClient } from '@angular/common/http'
import { Page } from '../../domain/common'
import { Filter } from '../../domain/filter'

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  constructor(private http: HttpClient) {
  }

  createIngredient(request: CreateIngredientRequest) {
    return this.http.post<CreateIngredientResponse>(
      'ingredients/new',
      request
    )
  }

  getIngredients() {
    return this.http.get<Array<Ingredient>>('ingredients')
  }

  getIngredientInfo(id: number) {
    return this.http.get<IngredientInfo>(`ingredients/${id}`)
  }

  getIngredientsByFilter(filter: Filter) {
    return this.http.post<Page<Ingredient>>(
      'ingredients',
      filter
    )
  }

  updateIngredient(request: UpdateIngredientRequest) {
    return this.http.put<UpdateIngredientResponse>(
      'ingredients/update',
      request
    )
  }
}
