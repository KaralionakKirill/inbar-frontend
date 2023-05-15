import { Injectable } from '@angular/core'
import { CreateCocktailRequest, CreateCocktailResponse } from '../../domain/cocktail'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class CocktailService {

  constructor(private http: HttpClient) { }

  createCocktail(request: CreateCocktailRequest) {
    return this.http.post<CreateCocktailResponse>(
      'cocktails/new',
      request
    )
  }
}
