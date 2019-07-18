import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  }) 
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
baseUrl = environment.apiUrl + 'users/';
constructor(private http: HttpClient) { }

getUsers(): Observable<User[]>{
  return this.http.get<User[]>(this.baseUrl);
}

getUser(id): Observable<User>{
  return this.http.get<User>(this.baseUrl + id);
}

updateUser(id :number, updatedUser: User){
  return this.http.put(this.baseUrl+id,updatedUser);
}
setMainPhoto(userId: number, photoId :number){
  return this.http.post(this.baseUrl + userId +'/photos/'+photoId+'/setMain',{});
}

deletePhoto(userId: number, photoId:number){
  return this.http.delete(this.baseUrl+userId+'/photos/'+photoId);
}

}
