import { Component, OnInit } from '@angular/core'
import { CocktailGroup, CocktailInfo, IngredientDto, UpdateCocktailRequest } from '../../../domain/cocktail'
import { AlcoholDegree, CookingMethod, Measure, Status, Taste } from '../../../domain/common'
import { Ingredient, IngredientType } from '../../../domain/ingredient'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { CommonService } from '../../../services/common/common.service'
import { IngredientService } from '../../../services/ingredient/ingredient.service'
import { CocktailService } from '../../../services/cocktail/cocktail.service'
import { FileService } from '../../../services/file/file.service'
import { InformationMessageService } from '../../../services/information/information-message.service'
import { AuthService } from '../../../services/auth/auth.service'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-cocktail-management',
  templateUrl: './cocktail-management.component.html',
  styleUrls: ['./cocktail-management.component.css']
})
export class CocktailManagementComponent implements OnInit {
  imageId: number | null = null

  imageUrl: string = '../../../assets/img/figure/upload-banner.jpg'

  cocktailGroups: Array<CocktailGroup> = []

  cookingMethods: Array<CookingMethod> = []

  measure: Array<Measure> = []

  tastes: Array<Taste> = []

  alcoholDegrees: Array<AlcoholDegree> = []

  ingredients: Array<Ingredient> = []

  ingredientTypes: Array<IngredientType> = []

  cocktailInfo!: CocktailInfo

  statuses = Object.keys(Status).filter((item) => {
    return isNaN(Number(item))
  })

  selectedIngredients: {
    id: number
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

    status: new FormControl<Status | null>(null, Validators.required)
  })

  constructor(private commonService: CommonService,
              private ingredientService: IngredientService,
              private cocktailService: CocktailService,
              private fileService: FileService,
              private informationService: InformationMessageService,
              private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
        this.cocktailInfo = data['cocktailInfo']
        this.setFormValues()
      }
    )
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
        response.forEach(ingredient => {
          const found = this.cocktailInfo.ingredients.find(
            value => value.ingredient.id === ingredient.id
          )
          if (found) {
            this.selectedIngredients.push({
              id: found.id,
              selected: true,
              ingredient: ingredient,
              value: found.value,
              measure: found.measure
            })
          } else {
            this.selectedIngredients.push({
              id: 0,
              selected: false,
              ingredient: ingredient,
              value: null,
              measure: null
            })
          }
        })
      }
    })
  }

  setFormValues() {
    this.form.setValue({
      name: this.cocktailInfo.name,

      cookingSteps: this.cocktailInfo.cookingSteps,

      aboutCocktail: this.cocktailInfo.aboutCocktail,

      cookingMethod: this.cocktailInfo.cookingMethod,

      group: this.cocktailInfo.group,

      alcoholDegree: null,

      taste: null,

      status: this.cocktailInfo.status
    })
    this.imageId = this.cocktailInfo.imageId
    this.imageUrl = this.fileService.getFileUrl(this.cocktailInfo.imageId)
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

  onUpdate() {
    this.submit = true
    if (this.form.valid && this.imageId && this.allSelectedIngredientsValid()) {
      const ingredients: IngredientDto[] = []
      this.getSelectedIngredients().map(selectedIngredient =>
        ingredients.push({
          id: selectedIngredient.id,
          value: selectedIngredient.value!!,
          ingredient: selectedIngredient.ingredient!!,
          measure: selectedIngredient.measure!!
        })
      )
      const request: UpdateCocktailRequest = {
        id: this.cocktailInfo.id,

        name: this.form.get('name')!.value,

        cookingSteps: this.form.get('cookingSteps')!.value,

        aboutCocktail: this.form.get('aboutCocktail')!.value,

        imageId: this.imageId!,

        cookingMethod: this.form.get('cookingMethod')!.value,

        group: this.form.get('group')!.value,

        alcoholDegree: this.form.get('alcoholDegree')!.value,

        taste: this.form.get('taste')!.value,

        ingredients: ingredients,

        status: this.form.get('status')!.value,
      }
      this.cocktailService.updateCocktail(request).subscribe({
        next: response => {
          this.router.navigate(['/management/cocktails'], { replaceUrl: true }).then()
          this.informationService.success(`Коктейль ${response.name} успешно обновлен.`)
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

  getStatusValue(status: Status) {
    if (status == Status.DECLINED) return 'Отклонен'
    if (status == Status.PENDING) return 'На рассмотрении'
    return 'Одобрен'
  }
}
