import { Injectable } from '@angular/core';
import { NewUser } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  async registro(registerData:NewUser){
    return await fetch ("https://restaurant-api.somee.com/api/users",
      {
        method: "POST",
        headers:{
          "Content-Type": "application/json"
        },
         body: JSON.stringify(registerData)
      }
    );
  }
  
}
