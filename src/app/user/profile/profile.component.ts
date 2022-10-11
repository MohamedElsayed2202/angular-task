import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServicesService } from 'src/app/services/auth-services.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  id:number;
  user: User
  constructor(private auth: AuthServicesService, private router: Router) {
    this.id = parseInt(localStorage.getItem('id')!);
    this.user = {
      name:'',
      address: {
        city:'',
        postalCode:0,
        street:''
      },
      email: '',
      id: 0,
      number:'',
      password: ''
    }
   }

  ngOnInit(): void {
    this.auth.getUserById(this.id).subscribe(value => {
      this.user = value[0];
    })
  }

  edite(){
    this.router.navigateByUrl('/user/edit');
  }

}
