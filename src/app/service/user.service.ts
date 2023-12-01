
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'

@Injectable({providedIn:'root'})
export class userService {
 
  baseURL: string = "http://localhost:8080/users";
 
  constructor(private http: HttpClient) {
  }
 
  Login(user:UserLogin): Observable<any> {
    console.log("in user login service")
   return this.http.post(this.baseURL + '/login', user);
  }

  Register(user:UserRegiser): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(user);
    console.log(body)
    return this.http.post(this.baseURL, body,{'headers':headers})
  }

  Logout():String{
    localStorage.removeItem('token');
    return "logged out";

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