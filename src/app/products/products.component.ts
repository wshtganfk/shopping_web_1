import { Component, OnInit} from '@angular/core';

import axios from 'axios';
import { productService } from '../service/product.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { orderService } from '../service/order.service';
import { Route, Router } from '@angular/router';
import { watchlistService } from '../service/watchlist.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{

  constructor(private productService: productService,
              private orderService: orderService,
              private watchlistService:watchlistService,
              private router:Router
    ){}

  list:Array<any> = [];
  productMap = new Map<BigInt, cartProduct>();
  detailProduct:detailProduct | undefined;
  display:boolean = false;

  ngOnInit(): void {
    this.productService.GetAllProduct().subscribe(data => {
      console.log("data"+ data.data)
      this.list = data["data"];
    })
  }



  onClick(productId:BigInt, iname: String, quantity:number) {
    console.log("product id" + productId)
    console.log("product name" + iname)
    if(quantity == 0) {
      alert("no more left");
      return;
    }
    let tempProduct : cartProduct = {
      id:productId,
      name: iname,
      quantity: 1
    }
    if(!this.productMap.has(productId)) {
      this.productMap.set(productId, tempProduct)
    } else {
        let currentProduct = this.productMap.get(productId);
        if(currentProduct!.quantity >= quantity){
          alert("no more left");
          return;
        }
        currentProduct!.quantity = currentProduct!.quantity+ 1 ;
        this.productMap.set(productId, currentProduct!);
        
    }
    
  }

  toDetail(productId:BigInt){
    this.display = true;
    this.productService.GetProductById(productId).subscribe(e => {
      this.detailProduct = e["data"];
    })
  }

  AddWatchlist(product_Id:BigInt){
    const input: InputWatchList = {
      productId:product_Id.toString()

    }
    this.watchlistService.AddNewWatchlist(input).subscribe(e => {
      alert(e["message"])
    })
  }

  mostFreqProductList: Array<detailProduct> = [];

  MostFrequ(){
    this.productService.getMostFrequentlyPurchasedProduct().subscribe(e =>{
      console.log(e["data"]);
        this.mostFreqProductList = e["data"];
    })
  }

  mostRecentProductList:Array<detailProduct> = [];
  MostRecently(){
    this.productService.getMostRecentlyPurchasedProduct().subscribe(e =>{
      console.log(e["data"]);

        this.mostRecentProductList = e["data"];
    })
  }

  mostProfitProductList:Array<detailProduct> = [];
  MostProfit(){
    this.productService.getMostProfitableProduct().subscribe(e => {
      this.mostProfitProductList = e["data"];
    })
  }

  mostPopularProductList:Array<detailProduct> = [];
  MostPopular(){
    this.productService.TopThreePopularProduct().subscribe(e => {
      this.mostPopularProductList = e["data"];
    })
  }

  orderlist:Array<InputOrder> = [];

  placeOrder(){
    this.productMap.forEach(e => {
      let tempProduct : InputOrder = {
        productId:e.id,
        quantity: e.quantity
      }
        this.orderlist.push(tempProduct);
    })

    let request= {
      "order" : this.orderlist,
    }
    
      this.orderService.PlaceNewOrder(request).subscribe(e => {
        console.log("inplacing")
        if(e["success"] == true){
          alert(e["message"]);
          this.router.navigate(["/orders"]);
        }else{
          alert(e["message"]);
        }
      })
      
  }
}



interface cartProduct {
  id: BigInt ;
  name: String;
  quantity: number;
}
interface InputOrder{
  productId:BigInt;
  quantity:number;
}
interface detailProduct{
  product_id:BigInt;
  description: string,
  name: string,
  quantity: number,
  retail_price: number,
  wholesale_price: number
}
interface InputWatchList{
  productId:string;
}