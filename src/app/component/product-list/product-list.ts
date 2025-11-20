import { Component,input } from '@angular/core';
import { CategoryList } from '../category-list/category-list';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-product-list',
  imports: [],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList {

products = input.required<Product>();
}
