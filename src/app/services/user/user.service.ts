import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { UpdateUserRequest, UserInfo } from '../../domain/user'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getUserInfo(name: string) {
    return this.http.get<UserInfo>(`users/${name}`)
  }

  updateUser(name: string, request: UpdateUserRequest) {
    return this.http.post<UserInfo>(
      `users/${name}`,
      request
    )
  }
}
