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
    if(TOKEN){
      const accessToken = JSON.parse(TOKEN).accessToken;
      if(this.jwtHelper.isTokenExpired(TOKEN)){
        localStorage.removeItem('token');
        this.router.navigate(['/login'];)
      }else{
        request = request.clone({
          setHeaders:{
            Authorization: `Bearer ${accessToken}`
          }
        });
      }
    }
    return next.handle(request);
    
  }


}


