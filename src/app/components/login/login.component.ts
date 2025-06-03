import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private _builder = inject(FormBuilder);
  private _appService = inject(AppService);

  public form: FormGroup = this._builder.group({
    email: ['', [Validators.required, this.validateEmail]],
    password: ['', [Validators.required, this.validatePassword]],
  });

  validateEmail(control: AbstractControl) {
    const email = control.value;
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    return isValid ? null : { invalidEmail: true };
  }

  validatePassword(control: AbstractControl) {
    const password = control.value;
    const isValid = password && password.length >= 6;
    return isValid ? null : { invalidPassword: true };
  }

  onSubmit() {
    if (this.form.valid) {
      const credentials = this.form.value;
      this._appService.login(credentials).subscribe( ()=>console.log(' Login success') );
    }
  }
}
