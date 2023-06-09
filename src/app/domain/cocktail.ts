import { AlcoholDegree, CookingMethod, Measure, Status, Taste } from './common'
import { Ingredient } from './ingredient'
import { Comment } from './comment'

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

export interface UpdateCocktailRequest {
  id: number

  name: string

  cookingSteps: string

  aboutCocktail: string

  imageId: number

  cookingMethod: CookingMethod

  group: CocktailGroup

  alcoholDegree: AlcoholDegree

  taste: Taste

  ingredients: Array<IngredientDto>

  status: Status
}

export interface CreateCocktailResponse {
  id: number

  name: string
}

export interface UpdateCocktailResponse {
  id: number

  name: string
}

export interface IngredientDto {
  id: number

  value: number

  ingredient: Ingredient

  measure: Measure
}

export interface CocktailAuthor {
  id: number

  email: string

  firstname: string

  lastname: string
}

export interface Cocktail {
  id: number

  name: string

  imageId: number

  author: CocktailAuthor | null

  group: CocktailGroup

  likesAmount: number

  status: Status

  averageRating: number,

  createdTs: Date

  modifiedTs: Date
}

export interface CocktailInfo extends Cocktail {
  cookingSteps: string

  aboutCocktail: string

  taste: Taste

  alcoholDegree: AlcoholDegree

  cookingMethod: CookingMethod

  ingredients: Array<IngredientDto>

  comments: Array<Comment>
}
