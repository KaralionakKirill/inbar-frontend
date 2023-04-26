import { Component } from '@angular/core'
import { AuthService } from '../../services/auth/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  firstname!: string
  lastname!: string
  email!: string
  password!: string
  isError: boolean = false
  errorMessage!: string

  constructor(private authService: AuthService,
              private router: Router) {
  }

  displayError(message: string) {
    this.isError = true
    this.errorMessage = message
  }

  hideError() {
    this.isError = false
  }

  onRegister() {
    if (!this.email || !this.password || !this.firstname || !this.lastname) {
      this.displayError('Пожалуйста, введите email и пароль.')
      return
    }

    this.authService.register(this.email, this.password, this.firstname, this.lastname).subscribe({
      next: () => {
        this.hideError()
        this.router.navigate(['/'], { replaceUrl: true })
      },
      error: err => {
        this.displayError(err.error.message)
      }
    })
  }
}
