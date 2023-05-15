import { Component, OnInit } from '@angular/core'
import { CreateIngredientRequest, IngredientGroup, IngredientType } from '../../domain/ingredient'
import { IngredientService } from '../../services/ingredient/ingredient.service'
import { FileService } from '../../services/file/file.service'
import { CommonService } from '../../services/common/common.service'
import { AlcoholDegree, PrimaryIngredient, Taste } from '../../domain/common'
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

  ingredientGroups: Array<IngredientGroup> = []

  primaryIngredients: Array<PrimaryIngredient> = []

  tastes: Array<Taste> = []

  alcoholDegrees: Array<AlcoholDegree> = []

  form: FormGroup = new FormGroup({
    name: new FormControl<string | null>(null, Validators.required),

    description: new FormControl<string | null>(null, Validators.required),

    type: new FormControl<IngredientType | null>(null, Validators.required),

    group: new FormControl<IngredientGroup | null>(null, Validators.required),

    primaryIngredient: new FormControl<IngredientType | null>(null, Validators.required),

    alcoholDegree: new FormControl<AlcoholDegree | null>(null, Validators.required),

    taste: new FormControl<Taste | null>(null, Validators.required)
  })

  submit = false

  constructor(private ingredientService: IngredientService,
              private commonService: CommonService,
              private fileService: FileService,
              private informationService: InformationMessageService) {
  }

  ngOnInit(): void {
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
    if (this.form.valid && this.imageId) {
      const request: CreateIngredientRequest = {
        name: this.form.get('name')!.value,

        description: this.form.get('description')!.value,

        imageId: this.imageId!,

        type: this.form.get('type')!.value,

        group: this.form.get('group')!.value,

        primaryIngredient: this.form.get('primaryIngredient')!.value,

        alcoholDegree: this.form.get('alcoholDegree')!.value,

        taste: this.form.get('taste')!.value
      }
      this.ingredientService.createIngredient(request).subscribe({
        next: response => {
          this.form.reset()
          this.imageUrl = '../../../assets/img/figure/upload-banner.jpg'
          this.imageId = null
          this.submit = false
          this.informationService.success(`Ингредиент ${response.name} успешно добавлен.`)
        }
      })
    }
  }

  dropdownsValid() {
    return this.form.controls['type'].invalid ||
      this.form.controls['group'].invalid ||
      this.form.controls['primaryIngredient'].invalid ||
      this.form.controls['taste'].invalid ||
      this.form.controls['alcoholDegree'].invalid
  }
}
