import { Cocktail } from './cocktail'

export interface UserInfo{
  firstname: string

  lastname: string

  email: string

  avatarId: number | null

  aboutMe: string | null

  role: UserRole

  cocktails: Array<Cocktail>
}

export interface UpdateUserRequest{
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