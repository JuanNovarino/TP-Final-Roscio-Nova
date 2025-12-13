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

  ngOnInit (){
  if(this.myRestaurant.id){
     this.productService.getProductsByUserId(this.myRestaurant.id)
  }
  console.log(this.productService.products)
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
   // await this.myRestaurant.ngOnInit();
  }

}
