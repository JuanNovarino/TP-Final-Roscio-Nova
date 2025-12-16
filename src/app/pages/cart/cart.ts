import { Component,inject } from '@angular/core';
import { CartService } from '../../services/cart-service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {
  cartservice = inject (CartService)
  finalprice(){
    let total = 0
    for (const item of this.cartservice.items) {
      if (item.discount > 0) {
        total = total + item.price - (item.price * item.discount / 100)
      } else {
        total = total + item.price
      }
    }
    return total
  }
}
