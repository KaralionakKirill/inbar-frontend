import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from '../../constants/app-settings'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(environment.authTokenKey)
  }

  authenticate(email: string, password: string) {
    this.logOut()
    return new Observable<void>(observer => {
      this.http.post<{ token: string }>(
        'auth/authenticate',
        { email, password }
      ).subscribe({
        next: res => {
          localStorage.setItem(environment.authTokenKey, res.token)
          observer.next()
          observer.complete()
        },
        error: (err) => {
          observer.error(err)
        }
      })
    })
  }

  register(email: string, password: string, firstname: string, lastname: string) {
    return new Observable<void>(observer => {
      this.http.post<{ token: string }>(
        'auth/register',
        { email, password, firstname, lastname }
      ).subscribe({
        next: res => {
          localStorage.setItem(environment.authTokenKey, res.token)
          observer.next()
          observer.complete()
        },
        error: (err) => {
          observer.error(err.error.message)
        }
      })
    })
  }

  logOut(): void {
    localStorage.clear()
  }

  isAdmin(): string {
    const claims = this.getToken().split('.')[1]
    const decoded = JSON.parse(atob(claims))
    return decoded['role'] && decoded['role'] === 'admin'
  }

  isBartender(): string {
    const claims = this.getToken().split('.')[1]
    const decoded = JSON.parse(atob(claims))
    return decoded['role'] && decoded['role'] === 'bartender'
  }

  getToken(): string {
    return localStorage.getItem(environment.authTokenKey) || ''
  }
}
