import { Component, OnInit, inject,input, signal} from '@angular/core';
import { RouterLink } from "@angular/router";
import { CategoryService } from '../../services/category-service';
import { ProductService } from '../../services/product-service';
import { AuthService } from '../../services/auth-service';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../interfaces/category';
import { Product } from '../../interfaces/product';
import { LoggedCategoryList } from '../../component/logged-category-list/logged-category-list';

@Component({
  selector: 'app-myrestaurant',
  imports: [RouterLink, LoggedCategoryList],
  templateUrl: './myrestaurant.html',
  styleUrl: './myrestaurant.scss',
})
export class Myrestaurant{
  
 auth = inject(AuthService)
 categoryList : Category[] | undefined
  categoryService = inject(CategoryService)
  productService = inject(ProductService)
  id = this.auth.getUserId()
  
  async ngOnInit() {
    if (this.id != undefined) {
       const categories = await this.categoryService.getCategoriesByUserId(this.id)
    

    if (categories) {
          this.categoryList = categories;
      }
    }
  }

  
}
