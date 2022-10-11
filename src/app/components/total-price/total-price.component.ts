import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product-services/product.service';

@Component({
  selector: 'app-total-price',
  templateUrl: './total-price.component.html',
  styleUrls: ['./total-price.component.css']
})
export class TotalPriceComponent implements OnInit {

  constructor(private productService: ProductService) { }
  totalItems: number = 0; 
  totalPrice: number = 0;
  ngOnInit(){
    this.productService.getTotalItems().subscribe(value => this.totalItems = value);
    this.productService.getTotalPrice().subscribe(value => this.totalPrice = value);
  }
}
