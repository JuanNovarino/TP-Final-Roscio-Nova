import { Component, inject,OnInit,viewChild} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user-service';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  imports: [FormsModule, RouterModule],
  templateUrl: './edit-user.html',
  styleUrl: './edit-user.scss',
})
export class EditUser {
  userService = inject(UserService);
 router = inject(Router);
 route = inject(ActivatedRoute);
 errorEnBack = false;
 

 idUser: number | undefined; 
 userOriginal: User | undefined = undefined;
 
 
 form = viewChild<NgForm>('newProfileForm');

 isSubmitting = false;

 
 async ngOnInit() {

 const idUserString = this.route.snapshot.paramMap.get('idUser');
 
 if(idUserString){
 
 this.idUser = parseInt(idUserString, 10);
 
 
 const user = await this.userService.getUserbyid(this.idUser);
 
 if (user) {
 this.userOriginal = user;
 

 setTimeout(() => {
 this.form()?.setValue({

 restaurantName: this.userOriginal?.restaurantName,
 firstName: this.userOriginal?.firstName,
 lastName: this.userOriginal?.lastName,
 address: this.userOriginal?.address,
 phoneNumber: this.userOriginal?.phoneNumber,
 password: this.userOriginal?.password, 
});
 });
 }
 } else {
     
      this.router.navigate(['/admin/myprofile']);
    }
  }

  async handleFormSubmission(form: NgForm) {
    if (!this.idUser) return;

    this.errorEnBack = false;
    this.isSubmitting = true;

   
    const userToEdit: User = {
      id: this.idUser, 
      restaurantName: form.value.restaurantName,
      password: form.value.password,
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      address: form.value.address,
      phoneNumber: form.value.phoneNumber,
    };


    const res = await this.userService.editUser(userToEdit);

    this.isSubmitting = false;

    if (!res) {
      this.errorEnBack = true;
      alert("Error al editar el usuario. Intente nuevamente.");
      return;
    }

  
    alert("¡Perfil actualizado con éxito!");
    this.router.navigate(["/admin/myprofile"]); 
  }
}
