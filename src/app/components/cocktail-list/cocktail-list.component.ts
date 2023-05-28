import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Cocktail, CocktailGroup } from '../../domain/cocktail'
import { CocktailService } from '../../services/cocktail/cocktail.service'
import { AuthService } from '../../services/auth/auth.service'
import { InformationMessageService } from '../../services/information/information-message.service'
import { FileService } from '../../services/file/file.service'

@Component({
  selector: 'app-cocktail-list',
  templateUrl: './cocktail-list.component.html',
  styleUrls: ['./cocktail-list.component.css']
})
export class CocktailListComponent {
  @Input() cocktails: Array<Cocktail> = []
  @Input() totalRecords: number = 0
  @Output() paginatorOutput = new EventEmitter<number>()

  constructor(private cocktailService: CocktailService,
              private authService: AuthService,
              private informationService: InformationMessageService,
              private fileService: FileService) {
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

  onPageChange(event: any) {
    this.paginatorOutput.emit(event.first)
  }
}
