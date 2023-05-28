import { Cocktail } from './cocktail'

export interface UserInfo{
  id: number

  firstname: string

  lastname: string

  email: string

  avatarId: number | null

  aboutMe: string | null

  role: UserRole

  createdCocktails: Array<Cocktail>

  likedCocktails: Array<Cocktail>

  commentAmount: number
}

export interface UpdateUserRequest{
  id: number,

  firstname: string | null

  lastname: string | null

  avatarId: number | null

  aboutMe: string | null

  role: UserRole | null
}

export enum UserRole{
  USER = 'user',
  ADMIN = 'admin',
  BARTENDER = 'bartender'
}