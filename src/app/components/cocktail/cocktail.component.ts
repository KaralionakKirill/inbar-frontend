import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { FileService } from '../../services/file/file.service'
import { CocktailInfo, IngredientDto } from '../../domain/cocktail'

@Component({
  selector: 'app-cocktail',
  templateUrl: './cocktail.component.html',
  styleUrls: ['./cocktail.component.css']
})
export class CocktailComponent implements OnInit {
  cocktailInfo!: CocktailInfo

  ingredients: Array<IngredientDto> = []

  instruments: Array<IngredientDto> = []

  constructor(private route: ActivatedRoute,
              private fileService: FileService) {
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
        this.cocktailInfo = data['cocktailInfo']
        this.setIngredients()
        this.setInstruments()
      }
    )
  }

  getImageUrl() {
    return this.fileService.getFileUrl(this.cocktailInfo.imageId)
  }

  getUserAvatarUrl(avatarId: number | null) {
    if (avatarId == null) return '../../../assets/img/blog/comment1.jpg'
    return this.fileService.getFileUrl(avatarId)
  }

  getCocktailGroup() {
    return this.cocktailInfo.group.name.toUpperCase()
  }

  setIngredients() {
    this.ingredients = this.cocktailInfo.ingredients.filter(value => !value.ingredient.group.instrument)
  }

  setInstruments() {
    this.instruments = this.cocktailInfo.ingredients.filter(value => value.ingredient.group.instrument)
  }
}
