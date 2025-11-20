import { Component, inject, input } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { Category } from '../../interfaces/category';
import { Product } from '../../interfaces/product';
import { Menu } from '../../pages/menu/menu';
import { AuthService } from '../../services/auth-service';


@Component({
  selector: 'app-category-list',
  imports: [],
  templateUrl: './category-list.html',
  styleUrl: './category-list.scss',
})
export class CategoryList {
  menuService = inject(Menu)
  authService = inject(AuthService)
  category = input.required<Category>();
  productService = inject(ProductService)
  async ngOnInit(): Promise<void> {
  this.productService.getProductsByUserId(this.menuService.id());
}
}
