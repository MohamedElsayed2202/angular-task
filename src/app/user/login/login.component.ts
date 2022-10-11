import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServicesService } from 'src/app/services/auth-services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private auth: AuthServicesService) { }

  ngOnInit(): void {
  }

  login(email: string, password: string){
    this.auth.login(email, password)
  }

  register(){
    this.router.navigateByUrl('/user/register');
  }
}
