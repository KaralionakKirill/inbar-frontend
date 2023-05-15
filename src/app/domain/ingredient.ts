import { AlcoholDegree, PrimaryIngredient, Taste } from './common'

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
  id: number,

  name: string
}

export interface Ingredient {
  id: number

  name: string

  imageId: number

  type: IngredientType
}

export interface IngredientInfo extends Ingredient {
  description: string

  primaryIngredient: PrimaryIngredient

  alcoholDegree: AlcoholDegree

  taste: Taste | null
}