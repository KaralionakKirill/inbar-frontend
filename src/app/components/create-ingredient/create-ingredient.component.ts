import { Component, OnInit } from '@angular/core'
import { CreateIngredientRequest, IngredientType } from '../../domain/ingredient'
import { IngredientService } from '../../services/ingredient/ingredient.service'
import { FileService } from '../../services/file/file.service'
import { CompositionService } from '../../services/composition/composition.service'
import { AlcoholDegree, PrimaryIngredient, Taste } from '../../domain/composition'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { InformationMessageService } from '../../services/information/information-message.service'

@Component({
  selector: 'app-create-ingredient',
  templateUrl: './create-ingredient.component.html',
  styleUrls: ['./create-ingredient.component.css']
})
export class CreateIngredientComponent implements OnInit {
  imageId: number | null = null

  imageUrl: string = '../../../assets/img/figure/upload-banner.jpg'

  ingredientTypes: Array<IngredientType> = []

  primaryIngredients: Array<PrimaryIngredient> = []

  tastes: Array<Taste> = []

  alcoholDegrees: Array<AlcoholDegree> = []

  form: FormGroup = new FormGroup({
    name: new FormControl<string | null>(null, Validators.required),

    description: new FormControl<string | null>(null, Validators.required),

    type: new FormControl<IngredientType | null>(null, Validators.required),

    primaryIngredient: new FormControl<IngredientType | null>(null, Validators.required),

    alcoholDegree: new FormControl<AlcoholDegree | null>(null, Validators.required),

    taste: new FormControl<Taste | null>(null),
  })

  constructor(private ingredientService: IngredientService,
              private compositionService: CompositionService,
              private fileService: FileService,
              private informationService: InformationMessageService) {
  }

  ngOnInit(): void {
    this.compositionService.getIngredientTypes().subscribe({
      next: response => this.ingredientTypes = response
    })
    this.compositionService.getPrimaryIngredients().subscribe({
      next: response => this.primaryIngredients = response
    })
    this.compositionService.getTastes().subscribe({
      next: response => this.tastes = response
    })
    this.compositionService.getAlcoholDegrees().subscribe({
      next: response => this.alcoholDegrees = response
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
    if (this.form.valid && this.imageId) {
      const request: CreateIngredientRequest = {
        name: this.form.get('name')!.value,

        description: this.form.get('description')!.value,

        imageId: this.imageId!,

        type: this.form.get('type')!.value,

        primaryIngredient: this.form.get('primaryIngredient')!.value,

        alcoholDegree: this.form.get('alcoholDegree')!.value,

        taste: this.form.get('taste')!.value
      }
      this.ingredientService.createIngredient(request).subscribe({
        next: response => {
          this.form.reset()
          this.imageUrl = '../../../assets/img/figure/upload-banner.jpg'
          this.imageId = null
          this.informationService.success(`Ингредиент ${response.name} успешно добавлен.`)
        }
      })
    }
  }
}
