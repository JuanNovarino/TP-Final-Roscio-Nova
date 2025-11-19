import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { RestaurantList } from "../../component/restaurant-list/restaurant-list";
import { UserService } from '../../services/user-service';
//import { RestaurantService } from '../../services/restaurant-service';

@Component({
  selector: 'app-home',
  imports: [RouterLink, RestaurantList],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

  userService = inject(UserService)

   async ngOnInit(): Promise<void> {

   await this.userService.getUsers();
  }

 /* ngOnInit(): void {
    
  this.contactsService.getContacts();
  }

  authService = inject(AuthService);
  restaurantService = inject(RestaurantService);
  }
  */
}
