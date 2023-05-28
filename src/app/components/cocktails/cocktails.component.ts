import { Component, OnInit } from '@angular/core'
import { FileService } from '../../services/file/file.service'
import { CocktailService } from '../../services/cocktail/cocktail.service'
import { Cocktail, CocktailGroup } from '../../domain/cocktail'
import { AuthService } from '../../services/auth/auth.service'
import { InformationMessageService } from '../../services/information/information-message.service'
import { CommonService } from '../../services/common/common.service'
import { AlcoholDegree, CookingMethod, Taste } from '../../domain/common'
import { FilterMetadata, FilterOperator, MatchMode } from '../../domain/filter'
import { FilterService } from '../../services/filter/filter.service'

@Component({
  selector: 'app-cocktails',
  templateUrl: './cocktails.component.html',
  styleUrls: ['./cocktails.component.css']
})
export class CocktailsComponent implements OnInit {
  cocktails: Array<Cocktail> = []
  loading: boolean = true
  totalRecords: number = 0
  first: number = 0

  inputName: string | null = null

  cocktailGroups: Array<CocktailGroup> = []
  selectedCocktailGroup: CocktailGroup | null = null

  cookingMethods: Array<CookingMethod> = []
  selectedCookingMethod: CocktailGroup | null = null

  tastes: Array<Taste> = []
  selectedTaste: CocktailGroup | null = null

  alcoholDegrees: Array<AlcoholDegree> = []
  selectedAlcoholDegree: CocktailGroup | null = null

  advancedSearch: boolean = false

  constructor(private cocktailService: CocktailService,
              private authService: AuthService,
              private informationService: InformationMessageService,
              private commonService: CommonService,
              private filterService: FilterService,
              private fileService: FileService) {
  }

  ngOnInit(): void {
    const filter = this.buildFilter()
    this.cocktailService.getCocktailsByFilter(filter).subscribe({
      next: response => {
        this.cocktails = response.content
        this.totalRecords = response.totalElements
      }
    })
    this.commonService.getCookingMethods().subscribe({
      next: response => this.cookingMethods = response
    })
    this.commonService.getCocktailGroups().subscribe({
      next: response => this.cocktailGroups = response
    })
    this.commonService.getTastes().subscribe({
      next: response => this.tastes = response
    })
    this.commonService.getAlcoholDegrees().subscribe({
      next: response => this.alcoholDegrees = response
    })
  }

  getImageUrl(imageId: number) {
    return this.fileService.getFileUrl(imageId)
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

  onAdvancedSearch() {
    this.advancedSearch = !this.advancedSearch
  }

  onSearch() {
    const filter = this.buildFilter()
    this.cocktailService.getCocktailsByFilter(filter).subscribe({
      next: response => {
        this.cocktails = response.content
        this.totalRecords = response.totalElements
      }
    })
  }

  buildFilter(){
    const filters: { [s: string]: FilterMetadata[] } = {}
    if (this.inputName) {
      filters['name'] = [this.filterService.createFilterMetadata(
        [this.inputName],
        MatchMode.STARTS_WITH,
        FilterOperator.OR
      )]
    }
    if (this.selectedCookingMethod) {
      filters['cookingMethod'] = [this.filterService.createFilterMetadata(
        [this.selectedCookingMethod.name],
        MatchMode.EQ,
        FilterOperator.OR
      )]
    }
    if (this.selectedCocktailGroup) {
      filters['cocktailGroup'] = [this.filterService.createFilterMetadata(
        [this.selectedCocktailGroup.name],
        MatchMode.EQ,
        FilterOperator.OR
      )]
    }
    if (this.selectedAlcoholDegree) {
      filters['alcoholDegree'] = [this.filterService.createFilterMetadata(
        [this.selectedAlcoholDegree.name],
        MatchMode.EQ,
        FilterOperator.OR
      )]
    }
    if (this.selectedTaste) {
      filters['taste'] = [this.filterService.createFilterMetadata(
        [this.selectedTaste.name],
        MatchMode.EQ,
        FilterOperator.OR
      )]
    }
    return this.filterService.createFilter(this.first, 10, null, 1, filters)
  }

  onPageChange(first: number) {
    this.first = first
    const filter = this.buildFilter()
    this.cocktailService.getCocktailsByFilter(filter).subscribe({
      next: response => {
        this.cocktails = response.content
        this.totalRecords = response.totalElements
      }
    })
  }
}
