import { Component } from '@angular/core'
import { AuthService } from '../../services/auth/auth.service'
import { Router } from '@angular/router'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  errorMessage: string | null = null

  submit = false

  form: FormGroup = new FormGroup({
 //   professional: new FormControl<boolean>(false),

    firstname: new FormControl<string | null>(null, Validators.required),

    lastname: new FormControl<string | null>(null, Validators.required),

    email: new FormControl<string | null>(null, [Validators.required, Validators.email]),

    password: new FormControl<string | null>(null, Validators.required)
  })

  constructor(private authService: AuthService,
              private router: Router) {
  }

  displayError(message: string) {
    this.errorMessage = message
  }

  onRegister() {
    this.submit = true
    console.log(this.form.get('professional')!.value)
    if (this.form.valid) {
      this.authService.register(
        this.form.get('email')!.value,
        this.form.get('password')!.value,
        this.form.get('firstname')!.value,
        this.form.get('lastname')!.value,
        this.form.get('professional')!.value
      ).subscribe({
        next: () => {
          this.submit = false
          this.errorMessage = null
          this.router.navigate(['/'], { replaceUrl: true }).then()
        },
        error: err => {
          console.log(err)
          if (err.status == '403') {
            this.displayError('Такой E-mail уже используется.')
          } else {
            this.displayError(err.error.message)
          }
        }
      })
    }
  }
}
