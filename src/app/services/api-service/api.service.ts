import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, flatMap, map, Observable, retry, throwError } from 'rxjs';
import { Category } from 'src/app/category';
import { Product } from 'src/app/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  headersOptions;

  products: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  constructor(private httpClinte: HttpClient) {
    this.headersOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
  }

  getAllCategories(): Observable<Category[]> {
    return this.httpClinte.get<Category[]>(`${environment.categoriesApi}`);
  }

  getAllProducts(): BehaviorSubject<Product[]> {
    this.httpClinte.get<Product[]>(`${environment.productsApi}`).subscribe(value => {
      this.products.next(value);
    })
    return this.products
  }

  getProductsByCategoryId(id: number) {
    if (id == 0) {
      this.httpClinte.get<Product[]>(`${environment.productsApi}`).subscribe(value => {
        this.products.next(value);
      });
      return
    }

    this.httpClinte.get<Product[]>(`${environment.productsApi}?categoryId=${id}`).subscribe(value => {
      this.products.next(value);
    });
  }

  getProductById(id: number): Observable<Product[]> {
    return this.httpClinte.get<Product[]>(`${environment.productsApi}?id=${id}`)
  }

  addProduct(newPrd: Product): Observable<Product> {
    return this.httpClinte.post<Product>(`${environment.productsApi}`, JSON.stringify(newPrd), this.headersOptions).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  deleteProduct(id: number): Observable<Product>{
    return this.httpClinte.delete<Product>(`${environment.productsApi}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  upateProduct(id: number, prod: Product): Observable<Product>{
    return this.httpClinte.put<Product>(`${environment.productsApi}/${id}`, JSON.stringify(prod), this.headersOptions).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
