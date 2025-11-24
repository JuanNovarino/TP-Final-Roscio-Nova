import { Component,input,inject } from '@angular/core';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product-service';
import { Router,RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-details',
  imports: [RouterLink],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
})
export class ProductDetails {

  IdProduct = input.required<string>()
  idUser = input.required<string>();
  productService = inject(ProductService)
  producto : Product | undefined;
  router = inject(Router);
  cargandoProducto = false

   async ngOnInit() {
    if(this.IdProduct()){
      // Si encuentro el contacto en el array del servicio lo uso, mientras tanto cargo el contacto del backend por si hubo cambios en el contacto
      this.producto = this.productService.products.find(producto => producto.id.toString() === this.IdProduct());
      if(!this.producto) this.cargandoProducto = true;
      const res = await this.productService.getProductById(this.IdProduct());
      if(res) this.producto = res;
      this.cargandoProducto = false;
    }
  }
}

