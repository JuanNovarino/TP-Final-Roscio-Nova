import { Component, inject, input } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { Category } from '../../interfaces/category';
import { Product } from '../../interfaces/product';
import { Menu } from '../../pages/menu/menu';
import { AuthService } from '../../services/auth-service';
import { ProductList } from '../product-list/product-list';




@Component({
  selector: 'app-category-list',
  imports: [ProductList],
  templateUrl: './category-list.html',
  styleUrl: './category-list.scss',
})
export class CategoryList {
  
  restaurantSlug = input.required<string>();
  category = input.required<Category>();
 
  allProducts = input<Product[] | undefined>();
  idUser = input.required<number>();

  private sortProductsByFeatured(a: Product, b: Product): number {
    if (a.featured && !b.featured) {
        return -1;
    }
    if (!a.featured && b.featured) {
        return 1;
    }
    return 0;
  }

  
  filterProducts(): Product[] {
    
    const products = this.allProducts();
    const categoryId = this.category().id;

   
    if (!products || !categoryId) {
      return [];
    }

    
    const filteredProducts = products.filter(product => product.categoryId === categoryId);
    return filteredProducts.slice().sort(this.sortProductsByFeatured);
  }

}
