import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { samePassword } from 'src/app/directives/same-password.directive';
import { UniqueEmailVadidator } from 'src/app/directives/unique-email.directive';
import { AuthServicesService } from 'src/app/services/auth-services.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  
  constructor(private auth: AuthServicesService, private emailValidator: UniqueEmailVadidator, private fb: FormBuilder,private route: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
      this.registerForm = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.minLength(5)]),
        email: new FormControl('', {
          asyncValidators: [this.emailValidator.validate.bind(this.emailValidator)],
          updateOn: 'change'
        }),
        number: new FormControl('', [Validators.required, Validators.pattern('^[0][0-9]{10}$')]),
        address: this.fb.group({
          city: new FormControl('',Validators.required),
          postalCode: new FormControl('',Validators.required),
          street: new FormControl('',Validators.required)
        }),
        password: new FormControl('',Validators.required),
        confirm: new FormControl('',Validators.required)
      }, {validators: samePassword}); 
  }


  get formControlles() {
    return this.registerForm.controls;
  }


  registerUser(): void{
    let user: User = this.registerForm.value as User;
    const observer = {
      next: () => {
        alert("added succesfully");
        this.route.navigate(['/user/login']);
        
      },
      error: (err: Error)=> {alert(err.message)}
    };

    this.auth.register(user).subscribe(observer);
  }

}
