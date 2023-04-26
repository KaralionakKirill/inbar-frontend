import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { AppSettings } from '../../constants/app-settings'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(AppSettings.AUTH_TOKEN_KEY)
  }

  authenticate(email: string, password: string) {
    this.logOut()
    return new Observable<void>(observer => {
      this.http.post<{ token: string }>(
        'auth/authenticate',
        { email, password }
      ).subscribe({
        next: res => {
          localStorage.setItem(AppSettings.AUTH_TOKEN_KEY, res.token)
          observer.next()
          observer.complete()
        },
        error: (err) => {
          observer.error(err)
        }
      })
    })
  }

  register(email: string, password: string) {
    return new Observable<void>(observer => {
      this.http.post<{ token: string }>(
        'auth/register',
        { email, password }
      ).subscribe({
        next: res => {
          localStorage.setItem(AppSettings.AUTH_TOKEN_KEY, res.token)
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
}
