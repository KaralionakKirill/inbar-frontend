import { Injectable } from '@angular/core'
import { IngredientService } from '../../services/ingredient/ingredient.service'
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router'
import { IngredientInfo } from '../../domain/ingredient'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class IngredientResolverService implements Resolve<IngredientInfo>{

  constructor(private ingredientService: IngredientService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IngredientInfo> {
    const id = route.params['id']
    return this.ingredientService.getIngredientInfo(id)
  }
}
