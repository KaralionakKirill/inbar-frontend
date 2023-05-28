import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { UpdateUserRequest, UserInfo } from '../../domain/user'
import { FileService } from '../../services/file/file.service'
import { UserService } from '../../services/user/user.service'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { InformationMessageService } from '../../services/information/information-message.service'
import { Cocktail, CocktailGroup } from '../../domain/cocktail'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @ViewChild('closeUserModal') closeModal!: ElementRef

  userInfo!: UserInfo

  avatarUrl = '../../../assets/img/blog/author.jpg'

  form: FormGroup = new FormGroup({
    firstname: new FormControl<string | null>(null, Validators.required),

    lastname: new FormControl<string | null>(null, Validators.required),

    aboutMe: new FormControl<string | null>(null, Validators.required)
  })

  constructor(private route: ActivatedRoute,
              private fileService: FileService,
              private userService: UserService,
              private informationService: InformationMessageService) {
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
        this.userInfo = data['userInfo']
        this.setFileUrl()
        this.setFormValues()
      }
    )
  }

  onSelect(event: any) {
    if (event.target.files && event.target.files[0]) {
      const image = event.target.files[0]
      const imageName = event.target.files[0].name
      this.fileService.uploadFile(image, imageName).subscribe({
        next: fileId => {
          const request: UpdateUserRequest = {
            id: this.userInfo.id,

            firstname: null,

            lastname: null,

            aboutMe: null,

            avatarId: fileId,

            role: null
          }
          this.userService.updateUser(request).subscribe({
            next: response => {
              this.userInfo = response
              this.setFileUrl()
              this.setFormValues()
              this.informationService.success(`Аватар успешно обновлён.`)
            }
          })
        }
      })
    }
  }

  setFileUrl() {
    const avatarId = this.userInfo.avatarId
    if (avatarId) {
      this.avatarUrl = this.fileService.getFileUrl(avatarId)
    }
  }

  setFormValues() {
    this.form.setValue({
      firstname: this.userInfo.firstname,

      lastname: this.userInfo.lastname,

      aboutMe: this.userInfo.aboutMe,
    })
  }

  onUpdate() {
    if (this.form.valid) {
      const request: UpdateUserRequest = {
        id: this.userInfo.id,

        firstname: this.form.get('firstname')!.value,

        lastname: this.form.get('lastname')!.value,

        aboutMe: this.form.get('aboutMe')!.value,

        avatarId: null,

        role: null
      }
      this.userService.updateUser(request).subscribe({
        next: response => {
          this.userInfo = response
          this.setFormValues()
          this.closeModal.nativeElement.click()
          this.informationService.success(`Профиль успешно обновлён.`)
        }
      })
    }
  }

  onClose() {
    this.setFormValues()
  }

  createdCocktailsExist(){
    return this.userInfo.createdCocktails.length > 0
  }

  likedCocktailsExist(){
    return this.userInfo.likedCocktails.length > 0
  }

  getCocktailGroup(group: CocktailGroup) {
    return group.name.toUpperCase()
  }

  getImageUrl(imageId: number) {
    return this.fileService.getFileUrl(imageId)
  }

  likeCocktail(cocktail: Cocktail) {
    this.userService.likeCocktail(cocktail.id, this.userInfo.email).subscribe({
      next: (response) => {
        this.userInfo = response
      },
      error: err => {
        this.informationService.error(err.message)
      }
    })
  }
}
