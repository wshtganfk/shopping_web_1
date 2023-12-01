import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor(
    private router: Router, 
    private jwtHelper: JwtHelperService
    ) {}

    
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const TOKEN = localStorage.getItem('token');
    const headersConfig = {};
    
    if(!request.url.includes("/login") && TOKEN){
   
      const accessToken = JSON.parse(TOKEN).token;
      console.log("in intercept")
      
      if(this.jwtHelper.isTokenExpired(TOKEN)){
        localStorage.removeItem('token');
        this.router.navigate(['/login'])
      }else{
        console.log("tokenb"+accessToken)
        request = request.clone({
          setHeaders:{
            Authorization: 'Bearer ' + accessToken
          }
        });
      }
    }else{
      this.router.navigate(['/login'])
    }
    return next.handle(request);
    
  }


}


