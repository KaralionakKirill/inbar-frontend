import { Component, ViewChild } from '@angular/core'
import { LazyLoadEvent } from 'primeng/api'
import { Table } from 'primeng/table'
import { UpdateUserRequest, UserInfo, UserRole } from '../../../domain/user'
import { UserService } from '../../../services/user/user.service'
import { InformationMessageService } from '../../../services/information/information-message.service'

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.css']
})
export class UsersManagementComponent {
  @ViewChild('table') table!: Table

  users: Array<UserInfo> = []
  loading: boolean = true
  totalRecords: number = 0

  roles = Object.keys(UserRole).filter((item) => {
    return isNaN(Number(item))
  })

  constructor(private userService: UserService,
              private informationService: InformationMessageService) {
  }

  loadData(filter: LazyLoadEvent) {
    this.loading = true
    this.userService.getUsersByFilter(filter).subscribe({
      next: response => {
        this.users = response.content
        this.totalRecords = response.totalElements
        this.loading = false
      }
    })
  }

  getRoleValue(role: UserRole) {
    if (role.toLowerCase() == UserRole.USER) return 'Пользователь'
    if (role.toLowerCase() == UserRole.BARTENDER) return 'Бармен'
    return 'Администратор'
  }

  protected readonly onchange = onchange

  onChange(user: UserInfo) {
    const request : UpdateUserRequest = {
      id: user.id,

      firstname: null,

      lastname: null,

      aboutMe: null,

      avatarId: null,

      role: user.role
    }
    this.userService.updateUser(request).subscribe({
      next: response => {
        user = response
        this.informationService.success(`Статус пользователя успешно изменен.`)
      },
      error: err => {
        this.informationService.error(err.message)
      }
    })
  }
}
