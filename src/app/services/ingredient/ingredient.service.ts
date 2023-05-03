import { Injectable } from '@angular/core'
import { CreateIngredientRequest, CreateIngredientResponse } from '../../domain/ingredient'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  constructor(private http: HttpClient,) {
  }

  createIngredient(request: CreateIngredientRequest) {
    return this.http.post<CreateIngredientResponse>(
      'ingredients',
      request
    )
  }
}
