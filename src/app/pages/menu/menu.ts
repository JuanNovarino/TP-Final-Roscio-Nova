import { Component, inject, input } from '@angular/core';
import { CategoryService } from '../../services/category-service';
import { AuthService } from '../../services/auth-service';
import { Category } from '../../interfaces/category';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu {

  categoriesService = inject(CategoryService)
  authService = inject(AuthService)
  id = input.required<number>()
  categoryList : Category[] | undefined

  loadingCategories = true;

   async ngOnInit() {
    this.loadingCategories = true;

    const restaurantid = this.id()

    const categoriesData = await this.categoriesService.getCategoriesByUserId(restaurantid)

     if (categoriesData) {
        this.categoryList = categoriesData;
    }
    console.log(this.categoryList)

    this.loadingCategories = false;

  }

}
