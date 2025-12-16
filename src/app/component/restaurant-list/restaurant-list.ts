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

private slugify(text: string): string {
        return text
            .toLowerCase() 
            .trim()
            .replace(/[^\w\s-]/g, '') // Elimina caracteres no deseados
            .replace(/[\s_-]+/g, '-')  // Reemplaza espacios y guiones con un solo guion
            .replace(/^-+|-+$/g, '');  // Elimina guiones al principio/final
    }
    get restaurantSlug(): string {
        return this.slugify(this.restaurant().restaurantName);
    }
}