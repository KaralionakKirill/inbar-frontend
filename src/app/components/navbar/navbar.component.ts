import { Component, ElementRef, ViewChild } from '@angular/core'
import { AuthService } from '../../services/auth/auth.service'
import { Router } from '@angular/router'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @ViewChild('closeModal') closeModal!: ElementRef

  errorMessage: string | null = null

  submit = false

  form: FormGroup = new FormGroup({
    email: new FormControl<string | null>(null, [Validators.required, Validators.email]),

    password: new FormControl<string | null>(null, Validators.required)
  })

  constructor(private authService: AuthService,
              private router: Router) {
  }

  displayError(message: string) {
    this.errorMessage = message
  }

  isAuthenticated() {
    return this.authService.isAuthenticated()
  }

  onSignIn() {
    this.submit = true
    if (this.form.valid) {
      this.authService.authenticate(
        this.form.get('email')!.value,
        this.form.get('password')!.value
      ).subscribe({
        next: () => {
          this.form.reset()
          this.submit = false
          this.errorMessage = null
          this.router.navigate(['/'], { replaceUrl: true })
            .then(this.closeModal.nativeElement.click())
        },
        error: err => {
          if (err.status == '403') {
            this.displayError('Пожалуйста, проверьте E-mail и пароль.')
          } else {
            this.displayError(err.error.message)
          }
        }
      })
    }
  }

  logOut() {
    this.authService.logOut()
  }

  adminOrBartender() {
    return this.authService.isAdmin() || this.authService.isBartender()
  }
}
