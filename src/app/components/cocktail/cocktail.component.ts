import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { FileService } from '../../services/file/file.service'
import { CocktailInfo, IngredientDto } from '../../domain/cocktail'
import { AuthService } from '../../services/auth/auth.service'
import { InformationMessageService } from '../../services/information/information-message.service'
import { CocktailService } from '../../services/cocktail/cocktail.service'
import { CommentService } from '../../services/comment/comment.service'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { CreateCommentRequest } from '../../domain/comment'

@Component({
  selector: 'app-cocktail',
  templateUrl: './cocktail.component.html',
  styleUrls: ['./cocktail.component.css']
})
export class CocktailComponent implements OnInit {
  cocktailInfo!: CocktailInfo

  ingredients: Array<IngredientDto> = []

  instruments: Array<IngredientDto> = []

  form: FormGroup = new FormGroup({
    rating: new FormControl(0),

    message: new FormControl<string | null>(null, Validators.required)
  })

  submit: boolean = false

  constructor(private route: ActivatedRoute,
              private cocktailService: CocktailService,
              private commentService: CommentService,
              private authService: AuthService,
              private informationService: InformationMessageService,
              private fileService: FileService) {
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
        this.cocktailInfo = data['cocktailInfo']
        this.setIngredients()
        this.setInstruments()
      }
    )
  }

  getImageUrl() {
    return this.fileService.getFileUrl(this.cocktailInfo.imageId)
  }

  getUserAvatarUrl(avatarId: number | null) {
    if (avatarId == null) return '../../../assets/img/blog/comment1.jpg'
    return this.fileService.getFileUrl(avatarId)
  }

  getCocktailGroup() {
    return this.cocktailInfo.group.name.toUpperCase()
  }

  setIngredients() {
    this.ingredients = this.cocktailInfo.ingredients.filter(value => !value.ingredient.group.instrument)
  }

  setInstruments() {
    this.instruments = this.cocktailInfo.ingredients.filter(value => value.ingredient.group.instrument)
  }

  likeCocktail() {
    const username = this.authService.getName()
    this.cocktailService.likeByUser(this.cocktailInfo.id, username).subscribe({
      next: (response) => {
        this.cocktailInfo.likesAmount = response.likesAmount
      },
      error: err => {
        this.informationService.error(err.error.message)
      }
    })
  }

  canComment() {
    const userEmail = this.authService.getName()
    return this.cocktailInfo.comments.filter(value => value.author.email == userEmail).length == 0
  }

  onComment() {
    this.submit = true
    if (this.form.valid) {
      const request: CreateCommentRequest = {
        rating: this.form.get('rating')!.value,

        message: this.form.get('message')!.value,

        cocktailId: this.cocktailInfo.id,

        authorName: this.authService.getName()
      }
      this.commentService.createComment(request).subscribe({
        next: () => {
          this.submit = false
          this.cocktailService.getCocktailInfo(this.cocktailInfo.id).subscribe({
            next: response => {
              this.cocktailInfo = response
              this.informationService.success('Комментарий успешно добавлен.')
            },
            error: err => {
              this.informationService.error(err.message)
            }
          })
        },
        error: err => {
          this.informationService.error(err.message)
        }
      })
    }
  }
}
