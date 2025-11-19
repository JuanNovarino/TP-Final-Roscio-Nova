import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { RestaurantList } from "../../component/restaurant-list/restaurant-list";
import { UserService } from '../../services/user-service';


@Component({
  selector: 'app-home',
  imports: [RouterLink, RestaurantList],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

  userService = inject(UserService)

   async ngOnInit() {

   await this.userService.getUsers();
  }

}
