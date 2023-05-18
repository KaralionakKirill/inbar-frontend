import { Component, OnInit } from '@angular/core'
import { FileService } from '../../services/file/file.service'
import { CocktailService } from '../../services/cocktail/cocktail.service'
import { Cocktail, CocktailGroup } from '../../domain/cocktail'

@Component({
  selector: 'app-cocktails',
  templateUrl: './cocktails.component.html',
  styleUrls: ['./cocktails.component.css']
})
export class CocktailsComponent implements OnInit {
  cocktails: Array<Cocktail> = []

  constructor(private cocktailService: CocktailService,
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
}
