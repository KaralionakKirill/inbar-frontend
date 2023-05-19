import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { IngredientInfo } from '../../domain/ingredient'
import { FileService } from '../../services/file/file.service'
import { Cocktail, CocktailGroup } from '../../domain/cocktail'
import { AuthService } from '../../services/auth/auth.service'
import { CocktailService } from '../../services/cocktail/cocktail.service'
import { InformationMessageService } from '../../services/information/information-message.service'

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.css']
})
export class IngredientComponent implements OnInit {
  ingredientInfo!: IngredientInfo

  constructor(private route: ActivatedRoute,
              private authService: AuthService,
              private cocktailService: CocktailService,
              private informationService: InformationMessageService,
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

  relatedCocktailsExist() {
    return this.ingredientInfo.cocktails.length > 0
  }

  getCocktailGroup(group: CocktailGroup) {
    return group.name.toUpperCase()
  }

  likeCocktail(cocktail: Cocktail) {
    const username = this.authService.getName()
    this.cocktailService.likeByUser(cocktail.id, username).subscribe({
      next: (response) => {
        cocktail.likesAmount = response.likesAmount
      },
      error: err => {
        this.informationService.error(err.message)
      }
    })
  }
}
