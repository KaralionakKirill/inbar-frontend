import { Component, OnInit } from '@angular/core'
import { UserInfo } from '../../domain/user'
import { ActivatedRoute } from '@angular/router'
import { FileService } from '../../services/file/file.service'
import { UserService } from '../../services/user/user.service'
import { InformationMessageService } from '../../services/information/information-message.service'
import { Cocktail, CocktailGroup } from '../../domain/cocktail'

@Component({
  selector: 'app-bartender',
  templateUrl: './bartender.component.html',
  styleUrls: ['./bartender.component.css']
})
export class BartenderComponent implements OnInit{
  userInfo!: UserInfo

  avatarUrl = '../../../assets/img/blog/author.jpg'

  constructor(private route: ActivatedRoute,
              private fileService: FileService,
              private userService: UserService,
              private informationService: InformationMessageService) {
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
        this.userInfo = data['userInfo']
        this.setFileUrl()
      }
    )
  }

  setFileUrl() {
    const avatarId = this.userInfo.avatarId
    if (avatarId) {
      this.avatarUrl = this.fileService.getFileUrl(avatarId)
    }
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
