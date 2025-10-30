/*import { Injectable } from '@angular/core';
import { Restaurant } from '../interfaces/restaurant';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  readonly URL_BASE = "https://restaurant-api.somee.com/api/";

  restaurant : Restaurant[] = []

  async getUsers() {
    const res = await fetch(this.URL_BASE,
      {
        headers:{
          Authorization: "Bearer ", //+this.authService.token
        }
      }
    )
    const resJson : Restaurant[] = await res.json()
    this.restaurant = resJson;

  }
  
}
*/