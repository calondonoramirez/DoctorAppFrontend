import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { SharedService } from 'src/app/shared/shared.service';
import { Login } from '../interfaces/login';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formLogin: FormGroup;
  hidePassword: boolean = true;
  showLoading: boolean = false;

  constructor(private fb: FormBuilder,
              private router: Router,
              private userService: UserService,
              private sharedService: SharedService,
              private cookieService: CookieService)
              {
                this.formLogin = this.fb.group({
                  username: ['', Validators.required],
                  password: ['', Validators.required]
                })
              }

    initSession()
    {
      this.showLoading = true;
      const request: Login = {
        username: this.formLogin.value.username,
        password: this.formLogin.value.password
      };

      this.userService.initSession(request).subscribe({
            next: (response) => {
              this.sharedService.saveSession(response); 
              console.log('Contenido del response: ', response);           

              this.cookieService.set(
                'Authorization',
                `Bearer ${response.token}`,
                undefined,
                '/',                
                undefined,
                true,
                'Strict'
              );

              this.router.navigate(['layout']);
            },
            complete: () => {
              this.showLoading = false;
            },
            error: (error) => {
              this.sharedService.showAlert(error.error, 'Error!');
              this.showLoading = false;
            }

      })

    }

}
