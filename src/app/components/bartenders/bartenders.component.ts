import { Component, OnInit } from '@angular/core'
import { UserInfo } from '../../domain/user'
import { UserService } from '../../services/user/user.service'
import { FileService } from '../../services/file/file.service'
import { InformationMessageService } from '../../services/information/information-message.service'

@Component({
  selector: 'app-bartenders',
  templateUrl: './bartenders.component.html',
  styleUrls: ['./bartenders.component.css']
})
export class BartendersComponent implements OnInit {
  bartenders: Array<UserInfo> = []

  avatarUrl = '../../../assets/img/blog/author2.jpg'

  constructor(private userService: UserService,
              private fileService: FileService,
              private informationService: InformationMessageService) {
  }

  ngOnInit(): void {
    this.userService.getBartenders().subscribe({
      next: response => {
        this.bartenders = response
      },
      error: err => {
        this.informationService.error(err.message)
      }
    })
  }

  getImageUrl(imageId: number | null) {
    if (!imageId) return this.avatarUrl
    return this.fileService.getFileUrl(imageId)
  }
}
