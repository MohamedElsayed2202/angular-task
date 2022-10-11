import { Component, OnInit } from '@angular/core';
import { AuthServicesService } from 'src/app/services/auth-services.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLogged: boolean = false;
  constructor(private auth: AuthServicesService) { }

  ngOnInit(): void {
    this.auth.loginStatus().subscribe(value => this.isLogged = value);
  }

  logout() {
    this.auth.logout();
  }

}
