import { Component, input, inject } from '@angular/core';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product-service';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { CurrencyPipe,CommonModule } from '@angular/common';

@Component({
  selector: 'app-logged-product-details',
  imports: [RouterLink,CurrencyPipe,CommonModule],
  templateUrl: './logged-product-details.html',
  styleUrl: './logged-product-details.scss',
})
export class LoggedProductDetails {

  IdProduct = input.required<string>()
  productService = inject(ProductService)
  
  producto : Product | undefined;
  router = inject(Router);
  cargandoProducto = false

   async ngOnInit() {
    if(this.IdProduct()){
      this.producto = this.productService.products.find(producto => producto.id.toString() === this.IdProduct());
      if(!this.producto) this.cargandoProducto = true;
      const res = await this.productService.getProductById(this.IdProduct());
      if(res) this.producto = res;
      this.cargandoProducto = false;
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

         const idToDelete = this.producto!.id;
         this.productService.deleteProduct(idToDelete);
         this.router.navigate(["/admin/myrestaurant"])
        }
      });
      
    }
}
