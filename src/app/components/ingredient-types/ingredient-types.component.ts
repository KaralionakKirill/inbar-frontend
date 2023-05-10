import { Component, OnInit } from '@angular/core'
import { CompositionService } from '../../services/composition/composition.service'
import { IngredientType } from '../../domain/ingredient'

@Component({
  selector: 'app-ingredient-types',
  templateUrl: './ingredient-types.component.html',
  styleUrls: ['./ingredient-types.component.css']
})
export class IngredientTypesComponent implements OnInit {
  ingredientTypes: Array<IngredientType> = []
  ingredientsAmount = 0

  constructor(private compositionService: CompositionService) {
  }

  ngOnInit(): void {
    this.compositionService.getIngredientTypes().subscribe({
      next: response => this.ingredientTypes = response
    })
    this.ingredientTypes.forEach(type => this.ingredientsAmount += type.ingredientsAmount)
  }

}
