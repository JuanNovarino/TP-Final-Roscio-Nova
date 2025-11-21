import { Component, inject, input } from '@angular/core';
import { Category } from '../../interfaces/category';
import { Myrestaurant } from '../../components/myrestaurant/myrestaurant';
import { ProductService } from '../../services/product-service';
@Component({
  selector: 'app-logged-category-list',
  imports: [],
  templateUrl: './logged-category-list.html',
  styleUrl: './logged-category-list.scss',
})
export class LoggedCategoryList {

  category = input.required<Category>()
  myRestaurant = inject(Myrestaurant)
  productService = inject(ProductService)


}
