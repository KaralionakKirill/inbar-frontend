import { Component, OnInit } from '@angular/core'
import { IngredientService } from '../../services/ingredient/ingredient.service'
import { Ingredient, IngredientGroup, IngredientType } from '../../domain/ingredient'
import { FileService } from '../../services/file/file.service'
import { FilterService } from '../../services/filter/filter.service'
import { FilterMetadata, FilterOperator, MatchMode } from '../../domain/filter'
import { CommonService } from '../../services/common/common.service'
import { CocktailGroup } from '../../domain/cocktail'
import { AlcoholDegree, PrimaryIngredient, Taste } from '../../domain/common'

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit {
  ingredients: Array<Ingredient> = []
  loading: boolean = true
  totalRecords: number = 0
  first: number = 0

  inputName: string | null = null

  ingredientTypes: Array<IngredientType> = []
  selectedIngredientType: IngredientType | null = null

  ingredientGroups: Array<IngredientGroup> = []
  selectedIngredientGroup: IngredientGroup | null = null

  primaryIngredients: Array<PrimaryIngredient> = []
  selectedPrimaryIngredient: PrimaryIngredient | null = null

  tastes: Array<Taste> = []
  selectedTaste: CocktailGroup | null = null

  alcoholDegrees: Array<AlcoholDegree> = []
  selectedAlcoholDegree: CocktailGroup | null = null

  advancedSearch: boolean = false

  constructor(private ingredientService: IngredientService,
              private commonService: CommonService,
              private fileService: FileService,
              private filterService: FilterService) {
  }

  ngOnInit(): void {
    const filter = this.buildFilter()
    this.ingredientService.getIngredientsByFilter(filter).subscribe({
      next: response => {
        this.ingredients = response.content
        this.totalRecords = response.totalElements
      }
    })
    this.commonService.getIngredientTypes().subscribe({
      next: response => this.ingredientTypes = response
    })
    this.commonService.getIngredientGroups().subscribe({
      next: response => this.ingredientGroups = response
    })
    this.commonService.getPrimaryIngredients().subscribe({
      next: response => this.primaryIngredients = response
    })
    this.commonService.getTastes().subscribe({
      next: response => this.tastes = response
    })
    this.commonService.getAlcoholDegrees().subscribe({
      next: response => this.alcoholDegrees = response
    })
  }

  onAdvancedSearch() {
    this.advancedSearch = !this.advancedSearch
  }

  getImageUrl(imageId: number) {
    return this.fileService.getFileUrl(imageId)
  }

  getIngredientType(type: IngredientType) {
    return type.name.toUpperCase()
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
    if (this.selectedIngredientType) {
      filters['ingredientType'] = [this.filterService.createFilterMetadata(
        [this.selectedIngredientType.name],
        MatchMode.EQ,
        FilterOperator.OR
      )]
    }
    if (this.selectedIngredientGroup) {
      filters['ingredientGroup'] = [this.filterService.createFilterMetadata(
        [this.selectedIngredientGroup.name],
        MatchMode.EQ,
        FilterOperator.OR
      )]
    }
    if (this.selectedPrimaryIngredient) {
      filters['primaryIngredient'] = [this.filterService.createFilterMetadata(
        [this.selectedPrimaryIngredient.name],
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
    console.log(filters)
    return this.filterService.createFilter(this.first, 10, null, 1, filters)
  }

  onPageChange(first: number) {
    this.first = first
    const filter = this.buildFilter()
    this.ingredientService.getIngredientsByFilter(filter).subscribe({
      next: response => {
        this.ingredients = response.content
        this.totalRecords = response.totalElements
      }
    })
  }

  onSearch() {
    const filter = this.buildFilter()
    console.log(filter)
    this.ingredientService.getIngredientsByFilter(filter).subscribe({
      next: response => {
        this.ingredients = response.content
        this.totalRecords = response.totalElements
      }
    })
  }
}
