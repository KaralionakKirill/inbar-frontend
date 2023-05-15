import { AlcoholDegree, CookingMethod, Measure, Taste } from './common'
import { Ingredient } from './ingredient'

export interface CocktailGroup {
  id: number

  name: string
}

export interface CreateCocktailRequest {
  name: string

  cookingSteps: string

  aboutCocktail: string

  author: string

  imageId: number

  cookingMethod: CookingMethod

  group: CocktailGroup

  alcoholDegree: AlcoholDegree

  taste: Taste

  ingredients: Array<IngredientDto>
}

export interface CreateCocktailResponse {
  id: number

  name: string
}

export interface IngredientDto {
  id: number

  value: number

  ingredient: Ingredient

  measure: Measure
}
