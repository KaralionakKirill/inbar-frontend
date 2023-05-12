import { Injectable } from '@angular/core'
import { ToastMessageKeyComponent, ToastMessageSeverity } from '../general/toast-message'
import { MessageService } from 'primeng/api'

@Injectable({
  providedIn: 'root'
})
export class InformationMessageService {

  constructor(private messageService: MessageService) {
  }

  informationDialog(
    message: string,
    severity: ToastMessageSeverity,
    key: ToastMessageKeyComponent,
    summary: string = 'Информационное сообщение'
  ) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: message,
      key: key
    })
  }

  error(message: string) {
    this.informationDialog(
      message,
      ToastMessageSeverity.ERROR,
      ToastMessageKeyComponent.NOTIFICATION
    )
  }

  warning(message: string) {
    this.informationDialog(
      message,
      ToastMessageSeverity.WARNING,
      ToastMessageKeyComponent.NOTIFICATION
    )
  }

  info(message: string) {
    this.informationDialog(
      message,
      ToastMessageSeverity.INFO,
      ToastMessageKeyComponent.NOTIFICATION
    )
  }

  success(message: string) {
    this.informationDialog(
      message,
      ToastMessageSeverity.SUCCESS,
      ToastMessageKeyComponent.NOTIFICATION
    )
  }
}
