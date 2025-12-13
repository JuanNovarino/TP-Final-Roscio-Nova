import { Injectable, inject } from '@angular/core';
import { AuthService } from './auth-service';
import { Product, NewProduct } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  authService = inject(AuthService);
  readonly URL_BASE ="https://w370351.ferozo.com/api/products";

  products : Product[] = [];

  async getMyProducts(){

    const res = await fetch( this.URL_BASE + "/me", {

      headers: {
        Authorization : "Bearer" + this.authService.getToken(),
      },
    });
    if (!res.ok) return undefined;
    const resJson : Product[] = await res.json();
    this.products = resJson;
    return resJson;
  }
  
  async getProductsByUserId(userId : string | number){
        const res = await fetch(`https://w370351.ferozo.com/api/users/${userId}/products`, {
             headers: {
                Authorization: "Bearer " + this.authService.getToken(),
            },
        });
        if (!res.ok) return undefined;
        const resProducts: Product[] = await res.json();
        this.products = resProducts
        return resProducts;
  }

  async getProductById(id: number | string) {
        const res = await fetch(this.URL_BASE + "/" + id, {
            headers: {
                Authorization: "Bearer " + this.authService.getToken(),
            },
        });
        if (!res.ok) return undefined;
        const resProduct: Product = await res.json();
        return resProduct;
  }

  async createProduct(newProduct: NewProduct) { //asignar id ?? 
        const res = await fetch(this.URL_BASE, {
            method: "POST",
            headers: {
                "Content-Type": "application/json", 
                Authorization: "Bearer " + this.authService.getToken(),
            },
            body: JSON.stringify(newProduct)
        });
        if (!res.ok) return undefined;
        const createdProduct: Product = await res.json();
        this.products.push(createdProduct);
        return createdProduct;
  }

  async editProduct(productEdit: Product) {
        const res = await fetch(this.URL_BASE + "/" + productEdit.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + this.authService.getToken(),
            },
            body: JSON.stringify(productEdit)
        });
        if (!res.ok) return undefined;
        const editedProduct: Product = await res.json();
        this.products = this.products.map(product => {
            if (product.id === editedProduct.id) return editedProduct;
            return product;
        });
        return editedProduct;
  }

  async deleteProduct(id: number) {
        const res = await fetch(this.URL_BASE + "/" + id, {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + this.authService.getToken(),
            },
        });
        if (!res.ok) return false;         
        this.products = this.products.filter(product => product.id !== id);
        return true;
  }

  async putHappyHour(id: number){
        const res = await fetch(this.URL_BASE + "/" + id + "/happyHour", {
            method: "PUT",
            headers: {
                Authorization: "Bearer " + this.authService.getToken(),
            },
        });
        if (!res.ok) return undefined;
        const updatedProduct: Product = await res.json();

        this.products = this.products.map(product => {
            if (product.id === updatedProduct.id) return updatedProduct;
            return product;
        });
        return updatedProduct;
  }

  async putDiscount(id: number, discountValue: number){
        const res = await fetch(this.URL_BASE + "/" + id + "/discount", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json", 
                Authorization: "Bearer " + this.authService.getToken(),
            },
            body: JSON.stringify({ discount: discountValue }) 
        });
        if (!res.ok) return undefined;
        const updatedProduct: Product = await res.json();

        this.products = this.products.map(product => {
            if (product.id === updatedProduct.id) return updatedProduct;
            return product;
        });
        return updatedProduct;
    }




  
}
