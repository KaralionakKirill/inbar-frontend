import { Injectable } from '@angular/core'
import { environment } from '../../constants/app-settings'

@Injectable({
  providedIn: 'root'
})
export class UrlBuilderService {

  constructor() { }

  build(url: string) {
    if (url.startsWith('http')) {
      return url
    }
    const optionalSlash = url.startsWith('/') ? '' : '/'
    return environment.backendUrl + optionalSlash + url
  }
}
