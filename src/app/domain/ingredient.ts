import { AlcoholDegree, PrimaryIngredient, Taste } from './composition'

export interface IngredientType {
  id: number

  name: string

  ingredientsAmount: number
}

export interface CreateIngredientRequest {
  name: string

  description: string

  imageId: number

  type: IngredientType

  primaryIngredient: PrimaryIngredient

  alcoholDegree: AlcoholDegree

  taste: Taste | null
}

export interface CreateIngredientResponse {
  id: number,

  name: string
}