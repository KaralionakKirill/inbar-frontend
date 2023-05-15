import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { AlcoholDegree, CookingMethod, Measure, PrimaryIngredient, Taste } from '../../domain/common'
import { IngredientGroup, IngredientType } from '../../domain/ingredient'
import { CocktailGroup } from '../../domain/cocktail'

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) {
  }

  getTastes() {
    return this.http.get<Array<Taste>>('common/tastes')
  }

  getPrimaryIngredients() {
    return this.http.get<Array<PrimaryIngredient>>('common/primary-ingredients')
  }

  getAlcoholDegrees() {
    return this.http.get<Array<AlcoholDegree>>('common/alcohol-degrees')
  }

  getIngredientTypes() {
    return this.http.get<Array<IngredientType>>('common/ingredient-types')
  }

  getIngredientGroups() {
    return this.http.get<Array<IngredientGroup>>('common/ingredient-groups')
  }

  getCookingMethods() {
    return this.http.get<Array<CookingMethod>>('common/cooking-methods')
  }

  getMeasure() {
    return this.http.get<Array<Measure>>('common/measure')
  }

  getCocktailGroups() {
    return this.http.get<Array<CocktailGroup>>('common/cocktail-groups')
  }
}
