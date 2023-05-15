import { Injectable } from '@angular/core'
import { CreateIngredientRequest, CreateIngredientResponse, Ingredient, IngredientInfo } from '../../domain/ingredient'
import { HttpClient } from '@angular/common/http'

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
}
