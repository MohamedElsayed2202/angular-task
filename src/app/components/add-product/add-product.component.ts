import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/category';
import { Product } from 'src/app/product';
import { ApiService } from 'src/app/services/api-service/api.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  categories: Category[] = [];
  name: string = '';
  product: Product = {} as Product;
  edit: boolean ;
  id: number = 0;
  productForm: FormGroup;
  constructor(private api: ApiService, private route: Router, private activatedRouter: ActivatedRoute) {
    this.edit =  Boolean(this.activatedRouter.snapshot.queryParamMap.get('edit'));
    if(this.edit){
      this.id = Number(this.activatedRouter.snapshot.queryParamMap.get('id'));
    }
    this.productForm = new FormGroup({
      title: new FormControl('',Validators.required),
      price: new FormControl('', Validators.required),
      quantity : new FormControl('', Validators.required),
      rate: new FormControl(''),
      category: new FormControl('', Validators.required),
      image: new FormControl('')
    });
   }

  ngOnInit(): void {
    this.api.getAllCategories().subscribe(value => {
      this.categories = value;
    });
    if(this.id > 0){
      this.api.getProductById(this.id).subscribe(value => {
        this.product = value[0];
        this.productForm = new FormGroup({
          title: new FormControl(this.product.title,Validators.required),
          price: new FormControl(this.product.price, Validators.required),
          quantity : new FormControl(this.product.quantity, Validators.required),
          rate: new FormControl(this.product.rating),
          category: new FormControl(this.product.categoryId, Validators.required),
          image: new FormControl(this.product.image)
        });
      })
    } 
  }

  get formControlles(){
    return this.productForm.controls;
  }

  addProduct(): void{
    let prod: Product = this.productForm.value as Product;
    const observer = {
      next: () => {
        alert("added succesfully");
        this.route.navigate(['/products']);
        
      },
      error: (err: Error)=> {alert(err.message)}
    };
    // this.api.addProduct(this.product).subscribe(observer);
    this.api.addProduct(prod).subscribe(observer);
  }

  updateProduct():void{
    let prod: Product = this.productForm.value as Product;
    const observer = {
      next: () => {
        alert("updated succesfully");
        this.route.navigate(['/products']);
        
      },
      error: (err: Error)=> {alert(err.message)}
    };
    // this.api.upateProduct(this.id, this.product).subscribe(observer);
    this.api.upateProduct(this.id, prod).subscribe(observer)
  }
}
