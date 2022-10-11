import { Directive, Injectable, } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { catchError, delay, map, Observable, of } from 'rxjs';
import { AuthServicesService } from '../services/auth-services.service';
@Injectable({ providedIn: 'root' })

export class UniqueEmailVadidator implements AsyncValidator {
  constructor(private auth: AuthServicesService) { }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.auth.existingEmail(control.value).pipe(delay(400),map(value => (value[0].email === control.value ? { existed: true } : null)), catchError(() => of(null)))
  }
}

@Directive({
  selector: '[appUniqueEmail]'
})
export class UniqueEmailDirective {

  constructor() { }

}
