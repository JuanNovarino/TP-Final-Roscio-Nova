import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-login-page',
  imports: [RouterModule, FormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {

  errorLogin = false;
  authService = inject(AuthService);

  async login(form:any){
    console.log(form.value)
    this.errorLogin = false;
    if(!form.value.restaurantName || !form.value.password){
      this.errorLogin = true;
      return
    }
    await this.authService.login(form.value);
    this.errorLogin = true;
  }
}
