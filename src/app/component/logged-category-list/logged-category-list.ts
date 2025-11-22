import { Component, inject, input } from '@angular/core';
import { Category } from '../../interfaces/category';
import { Myrestaurant } from '../../components/myrestaurant/myrestaurant';
import { ProductService } from '../../services/product-service';
import { LoggedProductList } from '../logged-product-list/logged-product-list';
import { AuthService } from '../../services/auth-service';
import { Product } from '../../interfaces/product';
import { Router, RouterLink } from '@angular/router';
import { CategoryService } from '../../services/category-service';


@Component({
  selector: 'app-logged-category-list',
  imports: [LoggedProductList,RouterLink],
  templateUrl: './logged-category-list.html',
  styleUrl: './logged-category-list.scss',
})
export class LoggedCategoryList {

  category = input.required<Category>()
  myRestaurant = inject(Myrestaurant)
  productService = inject(ProductService)
  categoryService = inject(CategoryService)
  router = inject(Router)
  auth = inject(AuthService)
  productList : Product[] | undefined
  
    
    async ngOnInit() {
      if (this.myRestaurant.id != undefined) {
         const product = await this.productService.getProductsByUserId(this.myRestaurant.id)
      
  
      if (product) {
            this.productList = product;
        }
      }
    }

     async deleteCategory() {
    if (this.category().id) {

      const res = await this.categoryService.deleteCategory(this.category().id);
     
      if (res) {
        alert('Cuenta eliminada con éxito.');
        this.router.navigate(['/admin/myrestaurant']);
      } else {
        alert('Error al eliminar la cuenta.');
      }
      
    }
  }
}
