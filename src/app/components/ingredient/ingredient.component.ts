import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { IngredientInfo } from '../../domain/ingredient'
import { FileService } from '../../services/file/file.service'
import { CocktailGroup } from '../../domain/cocktail'

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.css']
})
export class IngredientComponent implements OnInit {
  ingredientInfo!: IngredientInfo

  constructor(private route: ActivatedRoute,
              private fileService: FileService) {
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
        this.ingredientInfo = data['ingredientInfo']
      }
    )
  }

  getImageUrl(imageId: number) {
    return this.fileService.getFileUrl(imageId)
  }

  relatedCocktailsExist(){
    return this.ingredientInfo.cocktails.length > 0
  }

  getCocktailGroup(group: CocktailGroup) {
    return group.name.toUpperCase()
  }
}
