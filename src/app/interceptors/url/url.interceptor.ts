import { Injectable } from '@angular/core'
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Observable } from 'rxjs'
import { AppSettings } from '../../constants/app-settings'

@Injectable()
export class UrlInterceptor implements HttpInterceptor {

  constructor() {
  }

  build(url: string): string {
    if (url.startsWith('http')) {
      return url
    }
    const optionalSlash = url.startsWith('/') ? '' : '/'
    return `${AppSettings.API_ENDPOINT}${optionalSlash}${url}`
  }
  
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({
      url: this.build(request.url)
    })
    return next.handle(request)
  }
}
