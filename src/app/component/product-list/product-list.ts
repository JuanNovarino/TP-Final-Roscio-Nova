import { Component,input,inject } from '@angular/core';
import { CategoryList } from '../category-list/category-list';
import { Product } from '../../interfaces/product';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, CommonModule } from '@angular/common';
import { CartService } from '../../services/cart-service';

@Component({
  selector: 'app-product-list',
  imports: [RouterLink,CurrencyPipe,CommonModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList {
cartservice = inject (CartService)
products = input.required<Product>();
idUser = input.required<number>();
restaurantSlug = input.required<string>();

addcart(product:Product){
  const item : Product = {
    ...product
  }
  this.cartservice.uploadCart(item)
  
}
}
