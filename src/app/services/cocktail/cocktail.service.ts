import { Injectable } from '@angular/core'
import { Cocktail, CocktailInfo, CreateCocktailRequest, CreateCocktailResponse } from '../../domain/cocktail'
import { HttpClient } from '@angular/common/http'

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
}
