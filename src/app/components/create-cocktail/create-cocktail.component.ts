import { Component, OnInit } from '@angular/core'
import { AlcoholDegree, CookingMethod, Measure, Taste } from '../../domain/common'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { CommonService } from '../../services/common/common.service'
import { FileService } from '../../services/file/file.service'
import { InformationMessageService } from '../../services/information/information-message.service'
import { CocktailGroup, CreateCocktailRequest, IngredientDto } from '../../domain/cocktail'
import { Ingredient, IngredientType } from '../../domain/ingredient'
import { IngredientService } from '../../services/ingredient/ingredient.service'
import { CocktailService } from '../../services/cocktail/cocktail.service'
import { AuthService } from '../../services/auth/auth.service'

@Component({
  selector: 'app-create-cocktail',
  templateUrl: './create-cocktail.component.html',
  styleUrls: ['./create-cocktail.component.css']
})
export class CreateCocktailComponent implements OnInit {
  imageId: number | null = null

  imageUrl: string = '../../../assets/img/figure/upload-banner.jpg'

  cocktailGroups: Array<CocktailGroup> = []

  cookingMethods: Array<CookingMethod> = []

  measure: Array<Measure> = []

  tastes: Array<Taste> = []

  alcoholDegrees: Array<AlcoholDegree> = []

  ingredients: Array<Ingredient> = []

  ingredientTypes: Array<IngredientType> = []

  selectedIngredients: {
    selected: boolean,
    ingredient: Ingredient,
    value: number | null,
    measure: Measure | null
  }[] = []

  submit = false

  form: FormGroup = new FormGroup({
    name: new FormControl<string | null>(null, Validators.required),

    cookingSteps: new FormControl<string | null>(null, Validators.required),

    aboutCocktail: new FormControl<string | null>(null, Validators.required),

    cookingMethod: new FormControl<CookingMethod | null>(null, Validators.required),

    group: new FormControl<CocktailGroup | null>(null, Validators.required),

    alcoholDegree: new FormControl<AlcoholDegree | null>(null, Validators.required),

    taste: new FormControl<Taste | null>(null, Validators.required),
  })

  constructor(private commonService: CommonService,
              private ingredientService: IngredientService,
              private cocktailService: CocktailService,
              private fileService: FileService,
              private informationService: InformationMessageService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.commonService.getMeasure().subscribe({
      next: response => this.measure = response
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
    this.commonService.getIngredientTypes().subscribe({
      next: response => this.ingredientTypes = response.filter(value => value.ingredientsAmount > 0)
    })
    this.ingredientService.getIngredients().subscribe({
      next: response => {
        this.ingredients = response
        response.forEach(ingredient =>
          this.selectedIngredients.push({
            selected: false,
            ingredient: ingredient,
            value: null,
            measure: null
          })
        )
      }
    })
  }

  onSelect(event: any) {
    if (event.target.files && event.target.files[0]) {
      const image = event.target.files[0]
      const imageName = event.target.files[0].name
      this.fileService.uploadFile(image, imageName).subscribe({
        next: response => {
          this.imageId = response
          this.imageUrl = this.fileService.getFileUrl(response)
        }
      })
    }
  }

  onCreate() {
    this.submit = true
    if (this.form.valid && this.imageId && this.allSelectedIngredientsValid()) {
      const ingredients: IngredientDto[] = []
      this.getSelectedIngredients().map(selectedIngredient =>
        ingredients.push({
          id: 0,
          value: selectedIngredient.value!!,
          ingredient: selectedIngredient.ingredient!!,
          measure: selectedIngredient.measure!!
        })
      )
      const request: CreateCocktailRequest = {
        name: this.form.get('name')!.value,

        cookingSteps: this.form.get('cookingSteps')!.value,

        aboutCocktail: this.form.get('aboutCocktail')!.value,

        author: this.authService.getName(),

        imageId: this.imageId!,

        cookingMethod: this.form.get('cookingMethod')!.value,

        group: this.form.get('group')!.value,

        alcoholDegree: this.form.get('alcoholDegree')!.value,

        taste: this.form.get('taste')!.value,

        ingredients: ingredients
      }
      this.cocktailService.createCocktail(request).subscribe({
        next: response => {
          this.form.reset()
          this.imageId = null
          this.submit = false
          this.resetIngredient()
          this.imageUrl = '../../../assets/img/figure/upload-banner.jpg'
          this.informationService.success(`Коктейль ${response.name} успешно добавлен.`)
        }
      })
    }
  }

  removeIngredient(ingredient: Ingredient) {
    return this.selectedIngredients.filter(value => value.ingredient.id === ingredient.id)
      .forEach(value => {
        value.selected = false
        value.value = null
        value.measure = null
      })
  }

  resetIngredient() {
    this.selectedIngredients = []
    this.ingredients.forEach(ingredient =>
      this.selectedIngredients.push({
        selected: false,
        ingredient: ingredient,
        value: null,
        measure: null
      })
    )
  }

  getImageUrl(imageId: number) {
    return this.fileService.getFileUrl(imageId)
  }

  getSelectedIngredients() {
    return this.selectedIngredients.filter(value => value.selected)
  }

  getIngredientByType(type: IngredientType) {
    return this.selectedIngredients.filter(value => value.ingredient.type.id == type.id)
  }

  allSelectedIngredientsValid() {
    return this.getSelectedIngredients().length !== 0
      && this.getSelectedIngredients().filter(value =>
        value.ingredient == null ||
        value.measure == null ||
        value.value == null
      ).length == 0
  }

  dropdownsValid() {
    return this.form.controls['cookingMethod'].invalid ||
      this.form.controls['group'].invalid ||
      this.form.controls['taste'].invalid ||
      this.form.controls['alcoholDegree'].invalid
  }
}
