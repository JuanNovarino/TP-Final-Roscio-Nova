import { inject, Injectable } from '@angular/core';
import { NewUser, User } from '../interfaces/user';
import { AuthService } from './auth-service';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  authService = inject(AuthService)
  users: User[]=[];
  async registro(registerData:NewUser){
    return await fetch ("https://w370351.ferozo.com/api/users",
      {
        method: "POST",
        headers:{
          "Content-Type": "application/json"
        },
         body: JSON.stringify(registerData)
      }
    );
  }
  async getUserbyid (id:number|undefined){const res = await fetch(`https://w370351.ferozo.com/api/users/${id}`,{
    headers:{
      Authorization: "Bearer " + this.authService.token,  
    }
  });
  if (!res.ok) return undefined; ////
  const user = await res.json()
  return user
}
async getUsers (){
  const res = await fetch(`https://w370351.ferozo.com/api/users/`,{
    headers:{
      Authorization: "Bearer " + this.authService.token,  
    }
  });
  const user = await res.json()
  return user 
}
async deleteUser(id: number) {
        const res = await fetch(`https://w370351.ferozo.com/api/users/`+ id, {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + this.authService.token,
            },
        });
        if (!res.ok) return false;
        this.users = this.users.filter(user => user.id !== id);
        return true;
  }
  async editUser(userEdit: User) {
          const res = await fetch(`https://w370351.ferozo.com/api/users/`+ userEdit.id, {
              method: "PUT",
              headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + this.authService.token,
              },
              body: JSON.stringify(userEdit)
          });
          if (!res.ok) return undefined;
          this.users = this.users.map(user => {
              if (user.id === userEdit.id) return userEdit;
              return user;
          });
          return userEdit;
    }
}
