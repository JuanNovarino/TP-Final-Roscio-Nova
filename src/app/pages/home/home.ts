import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
//import { RestaurantService } from '../../services/restaurant-service';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

 /* ngOnInit(): void {
    
  this.contactsService.getContacts();
  }

  authService = inject(AuthService);
  restaurantService = inject(RestaurantService);
  }
  */
}
