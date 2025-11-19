import { Component, input } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-restaurant-list',
  imports: [RouterLink],
  templateUrl: './restaurant-list.html',
  styleUrl: './restaurant-list.scss',
})
export class RestaurantList {

   restaurant = input.required<User>();
}
