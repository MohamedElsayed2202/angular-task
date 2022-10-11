import { Component, OnInit, DoCheck, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CartItem } from 'src/app/cart-item';
import { Product } from 'src/app/product';
import { ApiService } from 'src/app/services/api-service/api.service';
import { ProductService } from 'src/app/services/product-services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  totalPrice = 0;
  constructor(private productService: ProductService, private api: ApiService) { }

  ngOnInit(): void {
    this.api.getAllProducts().subscribe(products => {
      this.products = products;
    })

    // this.productService.getSelectedCatId().subscribe(value => this.selectedCategory = value);
  }

}
