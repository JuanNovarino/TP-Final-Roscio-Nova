import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: Product[] = []

  constructor() {
    const guardado = localStorage.getItem('carrito');
    if (guardado) {
      this.items = JSON.parse(guardado)
    }
  }

  uploadCart(producto: Product) {
    this.items.push(producto)
    this.saveCart();
  }

  deleteCart(producto: Product) {
    this.items = this.items.filter(prod => prod != producto)
    this.saveCart()
  }
 
  saveCart() {
    localStorage.setItem('carrito', JSON.stringify(this.items))
  }

}
