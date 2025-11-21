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
export class Myrestaurant {
  
 
  categoriesService = inject(CategoryService)
  authService = inject(AuthService)
  IdUser = this.authService.getUserId()
  categoryList : Category[] | undefined

  loadingCategories = true;

   async ngOnInit() {

    this.loadingCategories = true;

    if(this.IdUser != undefined) {
      
      const categoriesData = await this.categoriesService.getCategoriesByUserId(this.IdUser)
    }
   

     if (categoriesData) {
        this.categoryList = categoriesData;
    }
    console.log(this.categoryList)

    this.loadingCategories = false;
   }

  
}
