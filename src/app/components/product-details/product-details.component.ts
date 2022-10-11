import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from 'src/app/cart-item';
import { Product } from 'src/app/product';
import { ApiService } from 'src/app/services/api-service/api.service';
import { ProductService } from 'src/app/services/product-services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  id: number;
  product: Product = {} as Product;
  prod: Product = {} as Product;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private productService: ProductService, private location: Location, private api: ApiService) { 
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.api.getProductById(this.id).subscribe(vaule => {
      this.product = vaule[0];
    })
    
  }

  back(): void{
    this.location.back();
  }

  edite(): void{
    this.router.navigateByUrl(`/products/add-product?edit=true&id=${this.id}`);
  }

  delete(): void{
    const observer = {
      next: () => {
        alert('Deleted successfully');
        this.router.navigate(['/products'])
      },
      error: (err: Error)=> {alert(err.message)}
    };

    this.api.deleteProduct(this.id).subscribe(observer);
  }

  deacrease(): void{
    this.product.quantity = +this.product.quantity - 1; 
    const item: CartItem ={
      name: this.product.title,
      price: this.product.price,
      quantity: 1
    };
    this.productService.addToCart(item);
  }

}
