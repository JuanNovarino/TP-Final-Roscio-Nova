import { Component,input, inject } from '@angular/core';
import { Myrestaurant } from '../../components/myrestaurant/myrestaurant';
import { Product } from '../../interfaces/product';
import { RouterLink } from '@angular/router';
import { CurrencyPipe,CommonModule } from '@angular/common';

@Component({
  selector: 'app-logged-product-list',
  imports: [RouterLink,CurrencyPipe,CommonModule],
  templateUrl: './logged-product-list.html',
  styleUrl: './logged-product-list.scss',
})
export class LoggedProductList {

  myrestaurant = inject(Myrestaurant)
  product = input.required<Product>();


}
