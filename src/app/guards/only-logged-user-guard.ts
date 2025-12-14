import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { inject } from '@angular/core';

// Esta función protege las rutas. Solo permite el acceso si hay un token.
export const onlyLoggedUserGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // Comprueba si la propiedad 'token' del servicio de autenticación existe
  if (!auth.token) {
    console.log('Guardia: Acceso denegado, redirigiendo a /login-page');
    
    // Redirige a la página de login (la tuya parece llamarse '/login-page')
    const newPath = router.parseUrl("/login"); 
    return new RedirectCommand(newPath, {
      skipLocationChange: true, // Opcional: mejora la experiencia al redirigir
    });
  }

  // Si hay token, permite el acceso
  return true; 
};