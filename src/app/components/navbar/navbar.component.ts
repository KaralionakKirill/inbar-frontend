import { Component, ElementRef, ViewChild } from '@angular/core'
import { AuthService } from '../../services/auth/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @ViewChild('closeModal') closeModal!: ElementRef

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

  isAuthenticated(){
    return this.authService.isAuthenticated()
  }

  onSignIn() {
    if (!this.email || !this.password) {
      this.displayError('Пожалуйста, введите email и пароль.')
      return
    }

    this.authService.authenticate(this.email, this.password).subscribe({
      next: () => {
        this.hideError()
        this.router.navigate(['/'], { replaceUrl: true })
          .then(this.closeModal.nativeElement.click())
      },
      error: err => {
        this.displayError(err.error.message)
      }
    })
  }

  logOut() {
    this.authService.logOut()
  }
}
