import { Component, inject, OnInit, signal,} from '@angular/core';
import { CategoryService } from '../../services/category-service';
import { AuthService } from '../../services/auth-service';
import { ProductService } from '../../services/product-service';
import { Category } from '../../interfaces/category';
import { Product } from '../../interfaces/product';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CategoryList } from '../../component/category-list/category-list';


@Component({
  selector: 'app-menu',
  imports: [RouterModule, CategoryList],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
   
})
export class Menu implements OnInit {
  categoriesService = inject(CategoryService)
  productsService = inject(ProductService)
  authService = inject(AuthService)
  route = inject(ActivatedRoute);
  
  id = signal<number>(0);
  restaurantSlug = signal<string>('');
  categoryList : Category[] | undefined
  allProducts: Product[] | undefined;
  loadingCategories = true;
  loadingProducts = true

  async ngOnInit() {

   
    
    this.loadingCategories = true;

    
  
    const restaurantNameSlug = this.route.snapshot.paramMap.get('restaurantNameSlug');

    const idUserString = this.route.snapshot.paramMap.get('idUser');

    
    if (!idUserString  || !restaurantNameSlug) {
      this.loadingCategories = false;
      return; 
    }

    const restaurantid = parseInt(idUserString, 10);

    this.id.set(restaurantid);
    this.restaurantSlug.set(restaurantNameSlug);
    
    const categoriesData = await this.categoriesService.getCategoriesByUserId(restaurantid);

    if (categoriesData) {
        this.categoryList = categoriesData;
    }
    

    this.loadingCategories = false;

    const productsData = await this.productsService.getProductsByUserId(restaurantid);

    if (productsData){
      this.allProducts = productsData;
    }
    this.loadingProducts = false;

    
  }
  
  }

  

