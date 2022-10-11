import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, delay, map, observable, Observable, of, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class AuthServicesService {


  private logged: BehaviorSubject<boolean>
  headersOptions;
  constructor(private httpClient: HttpClient, private router: Router) { 
    this.logged = new BehaviorSubject<boolean>(this.islogged())
    this.headersOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
  }

  register(user: User): Observable<User>{
    return this.httpClient.post<User>(environment.authApi, JSON.stringify(user), this.headersOptions)
    .pipe(retry(2),catchError(this.handleError));
  }

  login(email: string, password: string){
    this.httpClient.get<User[]>(`${environment.authApi}?email=${email}`).subscribe(value => {
      if(value[0].password === password){
        var token = '123456';
        localStorage.setItem('token',token);
        localStorage.setItem('id',value[0].id.toString());
        this.logged.next(true);
        this.router.navigateByUrl('/home');
      }
      else{
        alert('Wrong password');
      }
    })
  }

  existingEmail(email: string): Observable<User[]>{
    return this.httpClient.get<User[]>(`${environment.authApi}?email=${email}`)
  }

  logout(): void{
    localStorage.clear();
    this.logged.next(false);
    this.router.navigateByUrl('/user/login');
  }

  islogged(): boolean{
    return (localStorage.getItem('token'))? true : false;
  }

  loginStatus(): BehaviorSubject<boolean>{
    return this.logged
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

  getUserById(id: number): Observable<User[]>{
    return this.httpClient.get<User[]>(`${environment.authApi}?id=${id}`);
  }

  updateUser(user: User, id: number): Observable<User>{
    return this.httpClient.patch<User>(`${environment.authApi}/${id}`,JSON.stringify(user), this.headersOptions).pipe(
      retry(2),
      catchError(this.handleError)
    )
  }
}
