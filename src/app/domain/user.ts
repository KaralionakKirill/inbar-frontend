import { Cocktail } from './cocktail'

export interface UserInfo{
  firstname: string

  lastname: string

  email: string

  avatarId: number | null

  aboutMe: string | null

  role: UserRole

  createdCocktails: Array<Cocktail>

  likedCocktails: Array<Cocktail>
}

export interface UpdateUserRequest{
  username: string,

  firstname: string | null

  lastname: string | null

  avatarId: number | null

  aboutMe: string | null
}

export enum UserRole{
  USER = 'user',
  ADMIN = 'admin',
  BARTENDER = 'bartender'
}