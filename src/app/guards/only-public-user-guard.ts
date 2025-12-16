import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router'; 
import { AuthService } from '../services/auth-service';


export const onlyPublicUserGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.getToken()) { 
    console.log('Guardia: Usuario logeado, redirigiendo a /admin');
    return router.parseUrl("/admin"); 
  }
  
  
  return true;
};