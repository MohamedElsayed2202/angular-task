import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CartItem } from 'src/app/cart-item';
import { Product } from 'src/app/product';
import { ProductService } from 'src/app/services/product-services/product.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  constructor(private productService: ProductService) { }
  @Input() product: Product = {
    id:0,
    title:'',
    image:'',
    rating: 0,
    price: 0,
    quantity: 0,
    categoryId: 0
  }
  ngOnInit(): void {
  }

  deacrease(){
    this.product.quantity = +this.product.quantity - 1; 
    const item: CartItem ={
      name: this.product.title,
      price: this.product.price,
      quantity: 1
    };
    this.productService.addToCart(item);
  }
}
