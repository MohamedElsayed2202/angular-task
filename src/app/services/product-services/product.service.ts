import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';
import { CartItem } from 'src/app/cart-item';
import { Product } from 'src/app/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private cart: CartItem[];
  private totalPrice: BehaviorSubject<number>;
  private totalItems: BehaviorSubject<number>;
  constructor() {
    this.cart = [];
    this.totalPrice = new BehaviorSubject(0);
    this.totalItems = new BehaviorSubject(0)
   }
   
   addToCart(item: CartItem){
    const isExists = this.cart.findIndex(el => el.name === item.name);
    if(isExists > -1){
      this.cart[isExists].quantity += + item.quantity;
    }else{
      this.cart.push(item);
    } 
    this.totalPrice.next(this.getTotal());
    this.totalItems.next(this.cart.length);
  }

  private getTotal(): number{
    let total = 0;
    for (const item of this.cart) {
          total += +item.price * +item.quantity;
    }
    return  total;
  }

  getTotalItems(): BehaviorSubject<number>{
    return this.totalItems;
  }

  getTotalPrice(): BehaviorSubject<number>{
    return this.totalPrice;
  }
  
}
