import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth0Service {

  constructor(public authentication: AuthService) {}

  getUser(): Observable<any>{
    return this.authentication.user$;
  }
}
