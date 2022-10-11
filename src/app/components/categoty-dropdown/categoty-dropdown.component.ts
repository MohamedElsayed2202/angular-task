import { Component, OnInit, Output, EventEmitter, OnChanges, SimpleChanges, Input, DoCheck} from '@angular/core';
import { Category } from 'src/app/category';
import { ApiService } from 'src/app/services/api-service/api.service';
import { ProductService } from 'src/app/services/product-services/product.service';

@Component({
  selector: 'app-categoty-dropdown',
  templateUrl: './categoty-dropdown.component.html',
  styleUrls: ['./categoty-dropdown.component.css']
})
export class CategotyDropdownComponent implements OnInit{
  categories: Category[] = [];
  selectedCategory: number = 0;
  constructor(private api: ApiService) { 
  }
 
  ngOnInit(): void {
    this.api.getAllCategories().subscribe(value => {
      this.categories = value;
    })
    console.log("test")
  }


  setSelectedCatID(){
    this.api.getProductsByCategoryId(this.selectedCategory)
  }

}
