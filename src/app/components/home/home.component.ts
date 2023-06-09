import { Component, OnInit } from '@angular/core'
import { Cocktail, CocktailGroup } from '../../domain/cocktail'
import { CocktailService } from '../../services/cocktail/cocktail.service'
import { AuthService } from '../../services/auth/auth.service'
import { InformationMessageService } from '../../services/information/information-message.service'
import { FileService } from '../../services/file/file.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  mostRatedCocktails: Array<Cocktail> = []
  frequentlyLikedCocktails: Array<Cocktail> = []

  constructor(private cocktailService: CocktailService,
              private authService: AuthService,
              private informationService: InformationMessageService,
              private fileService: FileService) {
  }

  ngOnInit(): void {
    this.cocktailService.getFrequentlyLikedCocktails().subscribe({
      next: response => {
        this.frequentlyLikedCocktails = response
      }
    })
    this.cocktailService.getMostRatedCocktails().subscribe({
      next: response => {
        this.mostRatedCocktails = response
      }
    })
  }

  getImageUrl(imageId: number) {
    return this.fileService.getFileUrl(imageId)
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
        this.informationService.error(err.error.message)
      }
    })
  }
}
