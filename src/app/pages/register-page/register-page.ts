import { Component, inject } from '@angular/core';
import { FormsModule,NgForm } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { UserService } from '../../services/user-service';


@Component({
  selector: 'app-register-page',
  imports: [RouterModule,FormsModule,RouterLink],
  templateUrl: './register-page.html',
  styleUrl: './register-page.scss',
})
export class RegisterPage {

  errorRegister = false;
  userService = inject(UserService);
  router = inject(Router);

  async registro(form: NgForm){
    this.errorRegister = false;
    if(!form.value.restaurantName || 
      !form.value.password || 
      !form.value.password2 || 
      !form.value.firstName ||
      !form.value.lastName ||
      !form.value.address ||
      !form.value.phoneNumber||
      form.value.password !== form.value.password2){
      this.errorRegister = true;
      return

      
  }

  const res = await this.userService.registro(form.value);
  if(res.ok){
    this.router.navigate(["/login"])
  }
  this.errorRegister = true;
}
}
