import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { UpdateUserRequest, UserInfo } from '../../domain/user'
import { LazyLoadEvent } from 'primeng/api'
import { Page } from '../../domain/common'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getUserInfo(name: string) {
    return this.http.get<UserInfo>(`users/${name}`)
  }

  updateUser(request: UpdateUserRequest) {
    return this.http.put<UserInfo>(
      'users',
      request
    )
  }

  likeCocktail(cocktailId: number, username: string) {
    return this.http.put<UserInfo>(
      `users/like/cocktail/${cocktailId}`,
      null,
      {
        params: { username }
      }
    )
  }

  getBartenders() {
    return this.http.get<Array<UserInfo>>('users/bartenders')
  }

  getUsersByFilter(filter: LazyLoadEvent) {
    return this.http.post<Page<UserInfo>>(
      `users`,
      filter
    )
  }
}
