import { Injectable } from '@angular/core'
import { UserService } from '../../services/user/user.service'
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router'
import { Observable } from 'rxjs'
import { UserInfo } from '../../domain/user'
import { AuthService } from '../../services/auth/auth.service'

@Injectable({
  providedIn: 'root'
})
export class UserResolverService implements Resolve<UserInfo> {

  constructor(private userService: UserService,
              private authService: AuthService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserInfo> {
    const paramName = route.queryParams['name']
    if (paramName) {
      return this.userService.getUserInfo(paramName)
    } else {
      const name = this.authService.getName()
      return this.userService.getUserInfo(name)
    }
  }
}
