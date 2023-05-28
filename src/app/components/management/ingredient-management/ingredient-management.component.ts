import { Component, OnInit } from '@angular/core'
import { IngredientGroup, IngredientInfo, IngredientType, UpdateIngredientRequest } from '../../../domain/ingredient'
import { AlcoholDegree, PrimaryIngredient, Status, Taste } from '../../../domain/common'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { IngredientService } from '../../../services/ingredient/ingredient.service'
import { CommonService } from '../../../services/common/common.service'
import { FileService } from '../../../services/file/file.service'
import { InformationMessageService } from '../../../services/information/information-message.service'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-ingredient-management',
  templateUrl: './ingredient-management.component.html',
  styleUrls: ['./ingredient-management.component.css']
})
export class IngredientManagementComponent implements OnInit {
  imageId: number | null = null

  imageUrl: string = '../../../assets/img/figure/upload-banner.jpg'

  ingredientTypes: Array<IngredientType> = []

  ingredientGroups: Array<IngredientGroup> = []

  primaryIngredients: Array<PrimaryIngredient> = []

  tastes: Array<Taste> = []

  alcoholDegrees: Array<AlcoholDegree> = []

  ingredientInfo!: IngredientInfo

  statuses = Object.keys(Status).filter((item) => {
    return isNaN(Number(item))
  })

  form: FormGroup = new FormGroup({
    name: new FormControl<string | null>(null, Validators.required),

    description: new FormControl<string | null>(null, Validators.required),

    type: new FormControl<IngredientType | null>(null, Validators.required),

    group: new FormControl<IngredientGroup | null>(null, Validators.required),

    primaryIngredient: new FormControl<IngredientType | null>(null, Validators.required),

    alcoholDegree: new FormControl<AlcoholDegree | null>(null, Validators.required),

    taste: new FormControl<Taste | null>(null, Validators.required),

    status: new FormControl<Status | null>(null, Validators.required)
  })

  submit = false

  constructor(private ingredientService: IngredientService,
              private commonService: CommonService,
              private fileService: FileService,
              private informationService: InformationMessageService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
        this.ingredientInfo = data['ingredientInfo']
        this.setFormValues()
      }
    )
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

  setFormValues() {
    this.form.setValue({
      name: this.ingredientInfo.name,

      description: this.ingredientInfo.description,

      type: this.ingredientInfo.type,

      group: this.ingredientInfo.group,

      primaryIngredient: this.ingredientInfo.primaryIngredient,

      alcoholDegree: this.ingredientInfo.alcoholDegree,

      taste: this.ingredientInfo.taste,

      status: this.ingredientInfo.status
    })
    this.imageId = this.ingredientInfo.imageId
    this.imageUrl = this.fileService.getFileUrl(this.ingredientInfo.imageId)
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
    if (this.form.valid && this.imageId) {
      const request: UpdateIngredientRequest = {
        id: this.ingredientInfo.id,

        name: this.form.get('name')!.value,

        description: this.form.get('description')!.value,

        imageId: this.imageId!,

        type: this.form.get('type')!.value,

        group: this.form.get('group')!.value,

        primaryIngredient: this.form.get('primaryIngredient')!.value,

        alcoholDegree: this.form.get('alcoholDegree')!.value,

        taste: this.form.get('taste')!.value,

        status: this.form.get('status')!.value
      }
      this.ingredientService.updateIngredient(request).subscribe({
        next: response => {
          this.router.navigate(['/management/ingredients'], { replaceUrl: true }).then()
          this.informationService.success(`Ингредиент ${response.name} успешно обновлён.`)
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

  getStatusValue(status: Status) {
    if (status == Status.DECLINED) return 'Отклонен'
    if (status == Status.PENDING) return 'На рассмотрении'
    return 'Одобрен'
  }
}
