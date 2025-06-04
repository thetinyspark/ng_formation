import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
    styleUrl: './login.component.css'
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

    // IMPORTANT les validators doivent être des fonctions pures
    // çàd qu'elles ne modifient pas les valeurs provenant de l'extérieur, ici control.value
    // doit rester inchangé. 

    // la logique sous-jacente est que le formbuilder attend 
    // un objet contenant des erreurs en cas de problème ou null s'il n'y en a pas. 
    // pour valider un Validator, il faut donc retourner null.
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
