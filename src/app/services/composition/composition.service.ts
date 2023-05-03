import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { AlcoholDegree, PrimaryIngredient, Taste } from '../../domain/composition'
import { IngredientType } from '../../domain/ingredient'

@Injectable({
  providedIn: 'root'
})
export class CompositionService {

  constructor(private http: HttpClient) {
  }

  getTastes() {
    return this.http.get<Array<Taste>>('compositions/tastes')
  }

  getPrimaryIngredients() {
    return this.http.get<Array<PrimaryIngredient>>('compositions/primary-ingredients')
  }

  getAlcoholDegrees() {
    return this.http.get<Array<AlcoholDegree>>('compositions/alcohol-degrees')
  }

  getIngredientTypes() {
    return this.http.get<Array<IngredientType>>('compositions/ingredient-types')
  }
}
