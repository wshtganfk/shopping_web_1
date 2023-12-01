import { Component, OnInit} from '@angular/core';

import axios from 'axios';
import { productService } from '../service/product.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { orderService } from '../service/order.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{

  constructor(private productService: productService,
              private orderService: orderService,
              private router:Router
    ){}

  list:Array<any> = [];
  // page:Number = 0;
  productMap = new Map<BigInt, product>();

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
    let tempProduct : product = {
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
        if(e["success"] == true){
          alert(e["message"]);
          this.router.navigate(["/orders"]);
        }else{
          alert(e["message"]);
        }
      })
      
  }
}



interface product {
  id: BigInt ;
  name: String;
  quantity: number;
}
interface InputOrder{
  productId:BigInt;
  quantity:number;
}