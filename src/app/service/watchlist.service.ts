
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'

@Injectable({providedIn:'root'})
export class watchlistService {
 
  baseURL: string = "http://localhost:8080/watchlist/products";
 
  constructor(private http: HttpClient) {
  }
 

  GetAllWatchlist(): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    return this.http.get(this.baseURL, {'headers':headers})
  }

  AddNewWatchlist(watchlist:InputWatchList): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(watchlist);
    return this.http.post(this.baseURL, body, {'headers':headers})
  }

  DeleteWatchlist(id:BigInt): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    return this.http.delete(this.baseURL + `/` + id,{'headers':headers})
  }
 
}

interface InputWatchList{
  productId:string;
}