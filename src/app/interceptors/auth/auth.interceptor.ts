import { Injectable } from '@angular/core'
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Observable } from 'rxjs'
import { AppSettings } from '../../constants/app-settings'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({
      headers: request.headers.set(AppSettings.AUTH_HEADER_KEY, this.getAuthHeaderValue())
    })
    return next.handle(request)
  }

  getToken(): string {
    return localStorage.getItem(AppSettings.AUTH_TOKEN_KEY) || ''
  }

  getAuthHeaderValue(): any {
    return `Bearer ${this.getToken()}`
  }
}
