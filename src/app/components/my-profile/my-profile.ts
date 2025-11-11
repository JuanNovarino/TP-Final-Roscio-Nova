import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user-service';
import { AuthService } from '../../services/auth-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-profile',
  imports: [RouterModule,FormsModule],
  templateUrl: './my-profile.html',
  styleUrl: './my-profile.scss',
  standalone : true // ??
})
export class MyProfile implements OnInit {

// Dependencias
   userService = inject(UserService);
   authService = inject(AuthService);
   router = inject(Router);

  // Propiedades de estado
  userProfile: User | undefined;
  userEditado: User | undefined; // Copia para la edición
  cargandoPerfil: boolean = false;
  isEditing: boolean = false; // Estado para alternar entre ver/editar

  // 1. Cargar el perfil al iniciar
  async ngOnInit() {
    
    
    // Asume que este método obtiene el ID del usuario logueado (desde el token, etc.)
    const loggedUserId = this.authService.getUserId(); 
    
    if (loggedUserId) {
      // Usamos get user by ID, similar a tu getContactById
      const res = await this.userService.getUserbyid(loggedUserId); 
      
      if (res) {
        this.userProfile = res;
      }
    } else {
        // Si no hay ID, redirigir al login (por seguridad)
        this.router.navigate(['/admin']);
    }
    
  }

} 
