
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'

@Injectable({providedIn:'root'})
export class productService {
 
  baseURL: string = "http://localhost:8080/products";
 
  constructor(private http: HttpClient) {
  }
 

  GetAllProduct(): Observable<any> {
   
    return this.http.get(this.baseURL)
  }

  GetProductById(id:BigInt|undefined): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    return this.http.get(this.baseURL + `/` + id,{'headers':headers})
  }

  AddNewProduct(product:InputProduct): Observable<any> {
    const headers = { 'content-type': 'application/json', 'Access-Control-Allow-Origin':'*'}  
    const body=JSON.stringify(product);
    return this.http.post(this.baseURL, body, {'headers':headers})
  }

  UpdateProduct(product:InputProduct, id:BigInteger|any): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(product);
    return this.http.patch(this.baseURL + `/` + id, body, {'headers':headers})
  }

  getMostRecentlyPurchasedProduct(): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    return this.http.get(this.baseURL + `/recent?limit=3`, {'headers':headers})
  }

  getMostFrequentlyPurchasedProduct(): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    return this.http.get(this.baseURL + `/frequent?limit=1`, {'headers':headers})
  }

  getMostProfitableProduct(): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    return this.http.get(this.baseURL + `/profit?limit=3`, {'headers':headers})
  }
  TopThreePopularProduct(): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    return this.http.get(this.baseURL + `/popular?limit=3`, {'headers':headers})
  }



 
}


interface InputProduct{
  name:string;
  description:string;
  wholesale_price:number;
  retail_price:number;
  quantity:number;
}