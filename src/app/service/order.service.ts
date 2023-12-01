import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'

@Injectable({providedIn:'root'})
export class orderService {
 
  baseURL: string = "http://localhost:8080/orders";
 
  constructor(private http: HttpClient) {
  }
 

  PlaceNewOrder(order:{}): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(order);
    return this.http.post(this.baseURL, body, {'headers':headers})
  }

  GetOrderByUserToken(): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    return this.http.get(this.baseURL, {'headers':headers})
  }

  GetOrderById(id:BigInt): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    return this.http.get(this.baseURL + `/` + id, {'headers':headers})
  }

  CancelOrder(id:BigInt): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    return this.http.get(this.baseURL + `/` + id + `?status=cancel`, {'headers':headers})
  }

  CompleteOrder(id:BigInt): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    return this.http.get(this.baseURL + `/` + id + `?status=complete`, {'headers':headers})
  }
 
}

interface InputOrder{
  productId:BigInt;
  quantity:number;
}