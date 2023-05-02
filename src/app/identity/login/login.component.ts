import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationRequest } from '../interfaces/authentication-response.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private builder: FormBuilder,
    private service: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    sessionStorage.clear();
  }
  result: any;

  loginform = this.builder.group({
    email: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required)
  });

  proceedlogin() {
    if (this.loginform.valid) {
      console.log(this.loginform.value);
      const request: AuthenticationRequest = {
        email: this.loginform.value.email!,
        password: this.loginform.value.password!
      }
      this.service.authenticate(request).subscribe(response => {
        if (response.exito) {
          sessionStorage.setItem('username', response.object.email)
          sessionStorage.setItem('token', response.object.jwToken)
          this.mostrarAlerta('Logeado Correctamente', 'Ok')
          this.router.navigate(['/cliente']);
        }
        else this.mostrarAlerta(response.error, 'Error')
      })
    }
  }

  mostrarAlerta(mensaje: string, accion: string) {
    this._snackBar.open(mensaje, accion, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    });
  }
}
