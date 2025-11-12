import { Injectable, inject, OnInit } from '@angular/core';
import { LoginData } from '../interfaces/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  
  router = inject(Router);
  token : null|string = null; //Se renderiza
  revisionTokenInterval: number | undefined;
  id : number | undefined = undefined ;

  ngOnInit(): void {
    
    if(this.token){
      this.revisionTokenInterval = this.revisionToken() //el window soluciona la posibilidad de que reivision interval sea un timeout
    }
  }

  async login(loginData:LoginData ){
    const res = await fetch("https://w370351.ferozo.com/api/Authentication/login",
      {
        method:"POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(loginData)
      }
    )
    if(res.ok){
      this.token = await res.text()
      localStorage.setItem("token",this.token);
      this.id =this.getUserId();
      this.router.navigate(["/admin"])
    }
  }

    parseJwt (token : string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
    }

    getUserId() {
    if (!this.token) return;
    return parseInt(this.parseJwt(this.token).sub);
    }


  logout(){
    this.token = null;
    localStorage.removeItem("token");
    this.router.navigate(["/"])
  }

  revisionToken() {
    return window.setInterval(() => { //le agregue el window.setinterval ya que con este nos aseguramos que sea un number debido a que restringimos el enfasis al navegador
      if (this.token) {
        const base64Url = this.token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        const claims: { exp: number } = JSON.parse(jsonPayload);
        if (new Date(claims.exp * 1000) < new Date()) {
          this.logout()
        }
      }
    }, 600)
  }
  
}
