import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private router: Router) { }

  loginStatus = false;

  logout() {
    this.loginStatus = false;
    this.router.navigate(['/login']);
  }

  login() {
    this.loginStatus = true;
    // this.router.navigate(['/dashboard']);
  }

  isLoggedIn() {
    return this.loginStatus;
  }

}
