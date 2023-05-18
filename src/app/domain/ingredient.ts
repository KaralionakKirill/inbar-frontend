import { AlcoholDegree, PrimaryIngredient, Status, Taste } from './common'
import { Cocktail } from './cocktail'

export interface IngredientType {
  id: number

  name: string

  imageName: string

  ingredientsAmount: number
}

export interface IngredientGroup {
  id: number

  name: string

  cocktailBaseName: string | null

  cocktail_base: boolean

  instrument: boolean
}

export interface CreateIngredientRequest {
  name: string

  description: string

  imageId: number

  type: IngredientType

  group: IngredientGroup

  primaryIngredient: PrimaryIngredient

  alcoholDegree: AlcoholDegree

  taste: Taste
}

export interface CreateIngredientResponse {
  id: number

  name: string
}

export interface Ingredient {
  id: number

  name: string

  imageId: number

  type: IngredientType

  group: IngredientGroup

  status: Status

  createdTs: Date

  modifiedTs: Date
}

export interface IngredientInfo extends Ingredient {
  description: string

  primaryIngredient: PrimaryIngredient

  alcoholDegree: AlcoholDegree

  taste: Taste

  cocktails: Array<Cocktail>
}