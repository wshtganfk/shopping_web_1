
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'

@Injectable({providedIn:'root'})
export class userService {
 
  baseURL: string = "http://localhost:8080/users";
 
  constructor(private http: HttpClient) {
  }
 
//   getPeople(): Observable<BackendResponse[]> {
//     console.log('getPeople '+this.baseURL + 'people')
//     return this.http.get<Person[]>(this.baseURL + 'people')
//   }
 
  Login(user:UserLogin): Observable<any> {
   return this.http.post(this.baseURL + '/login', user);
  }

  Register(user:UserRegiser): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(user);
    console.log(body)
    return this.http.post(this.baseURL, body,{'headers':headers})
  }
 
}

interface UserLogin{
  username:string;
  password:string;
}
interface UserRegiser{
  username:string;
  email:string;
  password:string;
  
}