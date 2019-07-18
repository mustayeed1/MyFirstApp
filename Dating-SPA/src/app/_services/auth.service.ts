import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { logging } from 'protractor';
import { map } from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
import { BehaviorSubject } from 'rxjs'; 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
baseURL = environment.apiUrl + 'auth/';
constructor(private http : HttpClient ) { }
jwtService = new JwtHelperService();
decodedToken :any;
currentUser :User;
photoUrl = new BehaviorSubject<string>('../../assets/user.png');
currentPhotoUrl = this.photoUrl.asObservable();

changeMemberPhoto(photoUrl: string){
  this.photoUrl.next(photoUrl);
}

login(model: any) {
  
  return this.http.post(this.baseURL +'login',model)
  .pipe(
    map((response: any) => {
  
      const user = response;
      if(user)
      {
        localStorage.setItem('token', user.token);
        localStorage.setItem('user', JSON.stringify(user.user));
        this.decodedToken = this.jwtService.decodeToken(user.token);
        this.currentUser = user.user;
        this.changeMemberPhoto(this.currentUser.photoUrl);
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
