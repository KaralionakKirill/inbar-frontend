import { Injectable } from '@angular/core'
import {
  Cocktail,
  CocktailInfo,
  CreateCocktailRequest,
  CreateCocktailResponse,
  UpdateCocktailRequest,
  UpdateCocktailResponse
} from '../../domain/cocktail'
import { Page } from '../../domain/common'
import { HttpClient } from '@angular/common/http'
import { Filter } from '../../domain/filter'

@Injectable({
  providedIn: 'root'
})
export class CocktailService {

  constructor(private http: HttpClient) {
  }

  createCocktail(request: CreateCocktailRequest) {
    return this.http.post<CreateCocktailResponse>(
      'cocktails/new',
      request
    )
  }

  getCocktails() {
    return this.http.get<Array<Cocktail>>('cocktails')
  }

  getMostRatedCocktails() {
    return this.http.get<Array<Cocktail>>('cocktails/rated')
  }

  getFrequentlyLikedCocktails() {
    return this.http.get<Array<Cocktail>>('cocktails/liked')
  }

  getCocktailInfo(id: number) {
    return this.http.get<CocktailInfo>(`cocktails/${id}`)
  }

  likeByUser(id: number, username: string) {
    return this.http.put<Cocktail>(
      `cocktails/${id}/like/user`,
      null,
      {
        params: { username }
      }
    )
  }

  getCocktailsByFilter(filter: Filter) {
    return this.http.post<Page<Cocktail>>(
      '/cocktails',
      filter
    )
  }

  updateCocktail(request: UpdateCocktailRequest) {
    return this.http.put<UpdateCocktailResponse>(
      'cocktails/update',
      request
    )
  }
}
