import { Component, OnInit } from '@angular/core';
import { watchlistService } from '../service/watchlist.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrl: './watchlist.component.css'
})
export class WatchlistComponent implements OnInit{

  constructor(
    private watchlistService: watchlistService,
    private router:Router
){}
watchlist:Array<detailProduct> = [];
  ngOnInit(): void {
    this.watchlistService.GetAllWatchlist().subscribe(e =>{
      this.watchlist = e["data"];
    })
  }


  
  toRemove(product_id:BigInt){
    this.watchlistService.DeleteWatchlist(product_id).subscribe(data =>{
      alert(data["message"]);
      this.watchlist = data["data"];
    })
  }
}

interface detailProduct{
  product_id:BigInt;
  description: string,
  name: string,
  quantity: number,
  retail_price: number,
  wholesale_price: number
}
