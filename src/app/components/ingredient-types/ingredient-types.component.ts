import { Component, OnInit } from '@angular/core'
import { CommonService } from '../../services/common/common.service'
import { IngredientType } from '../../domain/ingredient'

@Component({
  selector: 'app-ingredient-types',
  templateUrl: './ingredient-types.component.html',
  styleUrls: ['./ingredient-types.component.css']
})
export class IngredientTypesComponent implements OnInit {
  ingredientTypes: Array<IngredientType> = []
  ingredientsAmount = 0

  constructor(private compositionService: CommonService) {
  }

  ngOnInit(): void {
    this.compositionService.getIngredientTypes().subscribe({
      next: response =>{
        this.ingredientTypes = response.filter(value => value.name !== 'Любой')
        response.forEach(type => this.ingredientsAmount += type.ingredientsAmount)
      }
    })
  }

}
