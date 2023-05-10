import { Component, OnInit } from '@angular/core'
import { IngredientService } from '../../services/ingredient/ingredient.service'
import { Ingredient, IngredientType } from '../../domain/ingredient'
import { FileService } from '../../services/file/file.service'

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit {
  ingredients: Array<Ingredient> = []
  ingredientsAmount = 0

  constructor(private ingredientService: IngredientService,
              private fileService: FileService) {
  }

  ngOnInit(): void {
    this.ingredientService.getIngredients().subscribe({
      next: response => this.ingredients = response
    })
  }

  getImageUrl(imageId: number) {
    return this.fileService.getFileUrl(imageId)
  }

  getIngredientType(type: IngredientType) {
    return type.name.toUpperCase()
  }
}
