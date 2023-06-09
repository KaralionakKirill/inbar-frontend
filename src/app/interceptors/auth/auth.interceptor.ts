import { Injectable } from '@angular/core'
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from '../../constants/app-settings'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({
      headers: request.headers.set(environment.authHeaderKey, this.getAuthHeaderValue())
    })
    return next.handle(request)
  }

  getToken(): string {
    return localStorage.getItem(environment.authTokenKey) || ''
  }

  getAuthHeaderValue(): any {
    return `Bearer ${this.getToken()}`
  }
}
