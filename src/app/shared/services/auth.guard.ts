import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  public localUser: any = localStorage.getItem('user');
  public parseUser: any = JSON.parse(this.localUser);

  canActivate() {
    if(this.parseUser) {
      return true
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
