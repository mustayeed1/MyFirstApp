import { Injectable } from '@angular/core';
import { CanActivate, Route, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private alertify: AlertifyService, private router : Router){}
  
  canActivate()
   :  boolean  {
      if(this.authService.loggedIn())
      {
        return true;
      }
     
      this.alertify.error('Please login to access');
      this.router.navigate(['/home']);

      return false;
    }


  }
  

