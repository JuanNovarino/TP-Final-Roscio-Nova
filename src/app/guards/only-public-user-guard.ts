import { inject } from '@angular/core';
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

// Esta función protege las rutas. Solo permite el acceso si NO hay un token.
export const onlyPublicUserGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // Comprueba si el usuario tiene un token de autenticación
  if (auth.token) {
    console.log('Guardia: Usuario logeado, redirigiendo a /home');
    
    // Redirige a la página de inicio ('/home' o '/')
    const newPath = router.parseUrl("/home"); 
    return new RedirectCommand(newPath, {
      skipLocationChange: true,
    });
  }

  // Si no hay token, permite el acceso (para que pueda logearse/registrarse)
  return true;
};