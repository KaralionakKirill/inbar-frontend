import { Component, OnInit } from '@angular/core'
import { FileService } from '../../services/file/file.service'
import { CocktailService } from '../../services/cocktail/cocktail.service'
import { Cocktail, CocktailGroup } from '../../domain/cocktail'
import { AuthService } from '../../services/auth/auth.service'
import { InformationMessageService } from '../../services/information/information-message.service'

@Component({
  selector: 'app-cocktails',
  templateUrl: './cocktails.component.html',
  styleUrls: ['./cocktails.component.css']
})
export class CocktailsComponent implements OnInit {
  cocktails: Array<Cocktail> = []

  constructor(private cocktailService: CocktailService,
              private authService: AuthService,
              private informationService: InformationMessageService,
              private fileService: FileService) {
  }

  ngOnInit(): void {
    this.cocktailService.getCocktails().subscribe({
      next: response => this.cocktails = response
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
