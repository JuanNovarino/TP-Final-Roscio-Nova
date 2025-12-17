import { Component, inject, input } from '@angular/core';
import { Category } from '../../interfaces/category';
import { Myrestaurant } from '../../components/myrestaurant/myrestaurant';
import { ProductService } from '../../services/product-service';
import { LoggedProductList } from '../logged-product-list/logged-product-list';
import { AuthService } from '../../services/auth-service';
import { Product } from '../../interfaces/product';
import { Router, RouterLink } from '@angular/router';
import { CategoryService } from '../../services/category-service';
import Swal from 'sweetalert2';


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
    const products = this.productService.products; 
    const categoryId = this.category().id;

    if (!products || products.length === 0 || !categoryId) {
      return [];
    }

    const filteredProducts = products.filter((product: Product) => product.categoryId === categoryId);

    return filteredProducts.slice().sort(this.sortProductsByFeatured);
  }

  ngOnInit (){
  if(this.myRestaurant.id){
     this.productService.getProductsByUserId(this.myRestaurant.id)
  }
  
  }


  async openDeleteModal(){
    
    Swal.fire({
      title: "¿Desea borrar la Categoria?",
      showDenyButton: true,
      showCancelButton: true,
      showConfirmButton: false,
      cancelButtonText: "Cancelar",
      denyButtonText: `Eliminar definitivamente`
    }).then((result) => {
      if (result.isDenied) { 
       this.categoryService.deleteCategory(this.category().id);
      }
    });
  }

}
