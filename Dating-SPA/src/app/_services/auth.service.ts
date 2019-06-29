import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { logging } from 'protractor';
import { map } from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
baseURL = 'http://localhost:5000/api/auth/';
constructor(private http : HttpClient ) { }
jwtService = new JwtHelperService();
decodedToken :any;
login(model: any) {
  
  return this.http.post(this.baseURL +'login',model)
  .pipe(
    map((response: any) => {
      const user = response;
      if(user)
      {
        localStorage.setItem('token', user.token);
        this.decodedToken = this.jwtService.decodeToken(user.token);
        console.log(this.decodedToken);
      }
    } )
    ) ;
}

register(model:any)
{
  return this.http.post(this.baseURL + "register", model);
}
loggedIn(){
  const token = localStorage.getItem('token');
  return !this.jwtService.isTokenExpired(token);

}


}
