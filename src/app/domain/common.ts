export interface AlcoholDegree {
  id: number

  name: string
}

export interface PrimaryIngredient {
  id: number

  name: string
}

export interface Taste {
  id: number

  name: string
}

export interface CookingMethod {
  id: number

  name: string
}

export interface Measure {
  id: number

  name: string
}

export enum Status {
  PENDING = 'PENDING',
  REVIEWED = 'REVIEWED',
  DECLINED = 'DECLINED'
}

export type Page<T> = {
  totalPages: number;
  totalElements: number;
  content: T[];
}