import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServicesService } from 'src/app/services/auth-services.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  updateForm: FormGroup;
  id!: number;
  user!: User;
  constructor(private auth: AuthServicesService, private fb: FormBuilder, private router: Router) { 
    this.updateForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      number: new FormControl('', [Validators.required, Validators.pattern('^[0][0-9]{10}$')]),
      address: this.fb.group({
        city: new FormControl('',Validators.required),
        postalCode: new FormControl('',Validators.required),
        street: new FormControl('',Validators.required)
      }),
    });
  }

  ngOnInit(): void {
    this.id = parseInt(localStorage.getItem('id')!);
    this.auth.getUserById(this.id).subscribe(value => {
      this.user = value[0];
      console.log(this.user)
      this.updateForm = new FormGroup({
        name: new FormControl(this.user.name, [Validators.required, Validators.minLength(5)]),
        number: new FormControl(this.user.number, [Validators.required, Validators.pattern('^[0][0-9]{10}$')]),
        address: this.fb.group({
          city: new FormControl(this.user.address.city,Validators.required),
          postalCode: new FormControl(this.user.address.postalCode,Validators.required),
          street: new FormControl(this.user.address.street,Validators.required)
        }),
      });
    })
  }

  get formControlles() {
    return this.updateForm.controls;
  }

  updateUser(): void{
    const observer={
      next: () => {
        alert('Update data successfully!');
        this.router.navigateByUrl('/user/profile');
      },
      error: (err: Error)=>{
        alert(err.message);
      }
    }
    this.user = this.updateForm.value as User;
    this.auth.updateUser(this.user,this.id).subscribe(observer);
  }

}
