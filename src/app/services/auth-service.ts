import { Injectable, inject } from '@angular/core';
import { LoginData } from '../interfaces/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  router = inject(Router);
  token : null|string = null;
  revisionTokenInterval: number | undefined;
  id: number | undefined = undefined;

  getToken(): string | null {
    if (!this.token) this.token = localStorage.getItem("token");
    return this.token;
  }

  async login(loginData: LoginData) {
    const res = await fetch("https://w370351.ferozo.com/api/Authentication/login",
      {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      }
    )
    if (res.ok) {
      const obj = await res.json()
      this.token = obj.token;
      localStorage.setItem("token", this.token!);
      this.id = this.getUserId();
      this.router.navigate(["/admin"])
    }
  }

  parseJwt(token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  getUserId() {
    const currentToken = this.getToken();
    if (!currentToken) return;
    return parseInt(this.parseJwt(currentToken).sub);
  }

  logout() {
    this.token = null;
    localStorage.removeItem("token");
    this.router.navigate(["/"])
  }
}
