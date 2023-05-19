import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { CreateCommentRequest } from '../../domain/comment'

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) {
  }

  createComment(request: CreateCommentRequest) {
    return this.http.post<void>(
      'comments/new',
      request
    )
  }

  findAllByCocktail(cocktailId: number) {
    return this.http.get<Comment>(`/cocktail/${cocktailId}`)
  }
}
