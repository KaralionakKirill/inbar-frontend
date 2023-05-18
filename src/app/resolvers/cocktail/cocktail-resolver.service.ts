import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router'
import { Observable } from 'rxjs'
import { CocktailInfo } from '../../domain/cocktail'
import { CocktailService } from '../../services/cocktail/cocktail.service'

@Injectable({
  providedIn: 'root'
})
export class CocktailResolverService implements Resolve<CocktailInfo> {

  constructor(private cocktailService: CocktailService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CocktailInfo> {
    const id = route.params['id']
    return this.cocktailService.getCocktailInfo(id)
  }
}
