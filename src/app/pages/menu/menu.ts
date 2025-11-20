import { Component, inject, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category-service';
import { AuthService } from '../../services/auth-service';
import { Category } from '../../interfaces/category';
import { ActivatedRoute, RouterModule } from '@angular/router';


@Component({
  selector: 'app-menu',
  imports: [RouterModule],
  templateUrl: './menu.html',
   
})
export class Menu implements OnInit {
categoriesService = inject(CategoryService)
  authService = inject(AuthService)
  route = inject(ActivatedRoute); 

  categoryList : Category[] | undefined
  loadingCategories = true;

  async ngOnInit() {
    
    this.loadingCategories = true;

    const idUserString = this.route.snapshot.paramMap.get('idUser');

    
    if (!idUserString) {
      this.loadingCategories = false;
      return; 
    }

    const restaurantid = parseInt(idUserString, 10);

    
    const categoriesData = await this.categoriesService.getCategoriesByUserId(restaurantid);

    if (categoriesData) {
        this.categoryList = categoriesData;
    }
    

    this.loadingCategories = false;
  }
  
  }

  
 

/*categoriesService = inject(CategoryService)
  authService = inject(AuthService)
  IdUser = input.required<number>()
  categoryList : Category[] | undefined

  loadingCategories = true;

   async ngOnInit() {
    this.loadingCategories = true;

    const restaurantid = this.IdUser()

    const categoriesData = await this.categoriesService.getCategoriesByUserId(restaurantid)

     if (categoriesData) {
        this.categoryList = categoriesData;
    }
    console.log(this.categoryList)

    this.loadingCategories = false;
   }*/

  

