import { UserInfo } from './user'

export interface Comment{
  rating: number,

  message: string,

  author: UserInfo,

  createdTs: Date
}

export interface CreateCommentRequest{
  rating: number,

  message: string,

  cocktailId: number,

  authorName: string
}