import { Component, OnInit, inject, input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user-service';
import { AuthService } from '../../services/auth-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-profile',
  imports: [RouterModule, FormsModule],
  templateUrl: './my-profile.html',
  styleUrl: './my-profile.scss',
  standalone: true // ??
})
export class MyProfile implements OnInit {


  userService = inject(UserService);
  authService = inject(AuthService);
  router = inject(Router);




  userProfile: User | undefined;
  //userEditado: User | undefined; 
  cargandoPerfil: boolean = false;
  //isEditing: boolean = false;


  async ngOnInit() {    
    const loggedUserId = this.authService.getUserId();
    console.log(loggedUserId);
    if (loggedUserId) {
      this.cargandoPerfil = true;
      const res = await this.userService.getUserbyid(loggedUserId);
      this.cargandoPerfil = false;
      this.userProfile = res;
    }
  }

  async deleteUser() {
    if (this.userProfile) {

      const res = await this.userService.deleteUser(this.userProfile.id);
     
      if (res) {
        alert('Cuenta eliminada con éxito.');
        this.authService.logout();
        this.router.navigate(['/']);
      } else {
        alert('Error al eliminar la cuenta.');
      }
      
    }
  }

} 
